// Concept map: a small force-directed graph drawn as SVG, no dependencies.
// Data comes from _data/graph.yml and _data/publications.yml (inlined as JSON).
(function () {
  "use strict";

  var host = document.getElementById("graph");
  var panel = document.getElementById("graph-panel");
  var dataEl = document.getElementById("graph-data");
  if (!host || !dataEl) return;

  var data = JSON.parse(dataEl.textContent);
  var pubs = JSON.parse((document.getElementById("pub-data") || {}).textContent || "[]");
  var pubByKey = {};
  pubs.forEach(function (p, i) { p._i = i; pubByKey[p.key] = p; });

  var NS = "http://www.w3.org/2000/svg";
  var groupById = {};
  data.groups.forEach(function (g) { groupById[g.id] = g; });

  var nodes, edges, byId, adj, W, H, svg, selected = null, raf = null;

  function el(name, attrs, parent) {
    var e = document.createElementNS(NS, name);
    for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(e);
    return e;
  }

  // Break long labels into two balanced lines.
  function wrap(label) {
    if (label.length <= 15 || label.indexOf(" ") < 0) return [label];
    var mid = label.length / 2, best = -1;
    for (var i = 0; i < label.length; i++) {
      if (label[i] === " " && (best < 0 || Math.abs(i - mid) < Math.abs(best - mid))) best = i;
    }
    return [label.slice(0, best), label.slice(best + 1)];
  }

  var measurer = document.createElement("canvas").getContext("2d");
  function textWidth(s, hub) {
    measurer.font = hub ? "600 15px Bricolage Grotesque, system-ui, sans-serif" : "11.5px IBM Plex Sans, system-ui, sans-serif";
    return measurer.measureText(s).width;
  }

  function build() {
    W = Math.max(300, host.clientWidth);
    var narrow = W < 640;
    H = narrow ? Math.round(Math.max(700, W * 2.1)) : Math.round(Math.min(680, Math.max(480, W * 0.7)));

    var anchors = narrow
      ? { universe: [0.36, 0.14], inference: [0.64, 0.38], ai: [0.36, 0.63], auto: [0.64, 0.87] }
      : { universe: [0.19, 0.27], inference: [0.39, 0.76], ai: [0.64, 0.24], auto: [0.83, 0.73] };

    nodes = []; edges = []; byId = {}; adj = {};

    function add(n) {
      n.lines = n.hub ? [n.label] : wrap(n.label);
      n.r = n.hub ? 8 : 4.5;
      n.lh = n.hub ? 18 : 13;
      var tw = Math.max.apply(null, n.lines.map(function (l) { return textWidth(l, n.hub); }));
      n.w = Math.max(tw, n.r * 2) + 14;
      n.top = n.r + 4;                              // box extent above the centre
      n.bottom = n.r + 8 + n.lines.length * n.lh;   // …and below it
      n.vx = 0; n.vy = 0;
      nodes.push(n); byId[n.id] = n; adj[n.id] = {};
    }
    function link(a, b, kind, len, k) {
      if (!byId[a] || !byId[b]) return;
      edges.push({ a: byId[a], b: byId[b], kind: kind, len: len, k: k });
      adj[a][b] = adj[b][a] = true;
    }

    var spoke = narrow ? 76 : 108;

    data.groups.forEach(function (g) {
      var a = anchors[g.id] || [0.5, 0.5];
      add({ id: g.id, label: g.label, group: g.id, hub: true, ax: a[0] * W, ay: a[1] * H, x: a[0] * W, y: a[1] * H });
    });
    var counts = {}, seen = {};
    data.nodes.forEach(function (n) { counts[n.group] = (counts[n.group] || 0) + 1; });
    data.nodes.forEach(function (n) {
      var hub = byId[n.group], i = (seen[n.group] = (seen[n.group] || 0) + 1);
      var ang = (i / counts[n.group]) * Math.PI * 2 + 0.4;
      add({ id: n.id, label: n.label, group: n.group, papers: n.papers || [],
            x: hub.x + Math.cos(ang) * spoke, y: hub.y + Math.sin(ang) * spoke });
      link(n.group, n.id, "spoke", spoke, 0.5);
    });
    data.links.forEach(function (l) {
      var same = byId[l[0]] && byId[l[1]] && byId[l[0]].group === byId[l[1]].group;
      link(l[0], l[1], "cross", same ? spoke * 0.9 : spoke * 2.1, same ? 0.25 : 0.04);
    });
    var done = {};
    data.groups.forEach(function (g) {
      (g.links || []).forEach(function (t) {
        var key = [g.id, t].sort().join("|");
        if (done[key]) return; done[key] = true;
        link(g.id, t, "hub", 0, 0);
      });
    });

    for (var i = 0; i < 600; i++) tick(Math.max(0.03, 1 - i / 450));
    draw();
    select(selected && byId[selected] ? selected : null, true);
  }

  function tick(alpha) {
    var i, j, a, b, dx, dy, d2, d, f, n = nodes.length;
    var charge = W < 640 ? 560 : 1100;

    for (i = 0; i < n; i++) {
      a = nodes[i];
      for (j = i + 1; j < n; j++) {
        b = nodes[j];
        dx = b.x - a.x; dy = b.y - a.y;
        d2 = dx * dx + dy * dy + 0.01;
        f = (charge * alpha) / d2;
        d = Math.sqrt(d2);
        dx = (dx / d) * f; dy = (dy / d) * f;
        a.vx -= dx; a.vy -= dy; b.vx += dx; b.vy += dy;
      }
    }
    edges.forEach(function (e) {
      if (!e.k) return;
      var dx = e.b.x - e.a.x, dy = e.b.y - e.a.y;
      var d = Math.sqrt(dx * dx + dy * dy) || 1;
      var f = ((d - e.len) / d) * e.k * alpha;
      dx *= f; dy *= f;
      e.a.vx += dx * 0.5; e.a.vy += dy * 0.5;
      e.b.vx -= dx * 0.5; e.b.vy -= dy * 0.5;
    });
    nodes.forEach(function (p) {
      if (p.hub) { p.vx += (p.ax - p.x) * 0.12 * alpha; p.vy += (p.ay - p.y) * 0.12 * alpha; }
      if (p.fixed) { p.vx = p.vy = 0; return; }
      p.x += p.vx; p.y += p.vy;
      p.vx *= 0.55; p.vy *= 0.55;
    });

    // Keep label boxes from overlapping.
    for (var pass = 0; pass < 3; pass++) {
      for (i = 0; i < n; i++) {
        a = nodes[i];
        for (j = i + 1; j < n; j++) {
          b = nodes[j];
          var acy = a.y + (a.bottom - a.top) / 2, bcy = b.y + (b.bottom - b.top) / 2;
          var ox = (a.w + b.w) / 2 - Math.abs(b.x - a.x);
          var oy = (a.top + a.bottom + b.top + b.bottom) / 2 - Math.abs(bcy - acy);
          if (ox <= 0 || oy <= 0) continue;
          var wa = a.fixed ? 0 : b.fixed ? 1 : 0.5, wb = 1 - wa;
          if (a.fixed && b.fixed) continue;
          if (ox < oy) {
            var sx = b.x >= a.x ? 1 : -1;
            a.x -= sx * ox * wa; b.x += sx * ox * wb;
          } else {
            var sy = bcy >= acy ? 1 : -1;
            a.y -= sy * oy * wa; b.y += sy * oy * wb;
          }
        }
      }
      nodes.forEach(function (p) {
        p.x = Math.min(W - p.w / 2 - 2, Math.max(p.w / 2 + 2, p.x));
        p.y = Math.min(H - p.bottom - 2, Math.max(p.top + 2, p.y));
      });
    }
  }

  function draw() {
    host.textContent = "";
    svg = el("svg", { viewBox: "0 0 " + W + " " + H, width: W, height: H, role: "presentation" }, host);
    var gE = el("g", {}, svg), gN = el("g", {}, svg);

    edges.forEach(function (e) {
      e.el = el("line", { class: "edge " + e.kind }, gE);
    });
    nodes.forEach(function (n) {
      var g = el("g", {
        class: "node n-" + n.group + (n.hub ? " hub" : ""),
        tabindex: 0, role: "button", "aria-pressed": "false",
        "aria-label": n.label + (n.hub ? " (theme)" : ", " + groupById[n.group].label)
      }, gN);
      g.style.touchAction = "none";
      el("circle", { class: "halo", r: n.r * 3 }, g);
      el("circle", { r: Math.max(16, n.r * 2), fill: "transparent", style: "fill:transparent" }, g); // hit area
      el("circle", { class: "core", r: n.r }, g);
      var t = el("text", { y: n.r + 6 + n.lh * 0.72 }, g);
      n.lines.forEach(function (line, i) {
        el("tspan", { x: 0, dy: i ? n.lh : 0 }, t).textContent = line;
      });
      n.el = g;
      wire(n);
    });
    place();
  }

  function place() {
    nodes.forEach(function (n) { n.el.setAttribute("transform", "translate(" + n.x.toFixed(1) + "," + n.y.toFixed(1) + ")"); });
    edges.forEach(function (e) {
      e.el.setAttribute("x1", e.a.x.toFixed(1)); e.el.setAttribute("y1", e.a.y.toFixed(1));
      e.el.setAttribute("x2", e.b.x.toFixed(1)); e.el.setAttribute("y2", e.b.y.toFixed(1));
    });
  }

  function highlight(id) {
    host.classList.toggle("has-active", !!id);
    nodes.forEach(function (n) {
      n.el.classList.toggle("active", n.id === id);
      n.el.classList.toggle("near", !!id && !!adj[id][n.id]);
    });
    edges.forEach(function (e) {
      e.el.classList.toggle("on", !!id && (e.a.id === id || e.b.id === id));
    });
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; });
  }

  function select(id, quiet) {
    selected = id;
    nodes.forEach(function (n) { n.el.setAttribute("aria-pressed", String(n.id === id)); });
    highlight(id);
    if (!panel) return;

    if (!id) {
      panel.innerHTML = "";
      return;
    }
    var n = byId[id], g = groupById[n.group], keys = {}, html;
    if (n.hub) {
      nodes.forEach(function (m) { if (!m.hub && m.group === n.id) m.papers.forEach(function (k) { keys[k] = 1; }); });
      html = "<h3><span class='dot g-" + n.group + "'></span>" + esc(n.label) + "</h3><p>" + esc(g.blurb) + "</p>";
    } else {
      n.papers.forEach(function (k) { keys[k] = 1; });
      var near = nodes.filter(function (m) { return !m.hub && adj[id][m.id]; }).map(function (m) { return esc(m.label); });
      html = "<h3><span class='dot g-" + n.group + "'></span>" + esc(n.label) + "</h3><p>" + esc(g.label) +
        (near.length ? " · connects to " + near.join(", ") : "") + "</p>";
    }
    var list = Object.keys(keys).map(function (k) { return pubByKey[k]; }).filter(Boolean)
      .sort(function (a, b) { return a._i - b._i; });
    if (list.length) {
      html += "<ul>" + list.map(function (p) {
        var href = p.arxiv ? "https://arxiv.org/abs/" + p.arxiv : p.doi ? "https://doi.org/" + p.doi : "";
        return "<li><span>" + p.year + "</span>" + (href ? "<a href='" + esc(href) + "'>" + esc(p.title) + "</a>" : esc(p.title)) + "</li>";
      }).join("") + "</ul>";
    }
    panel.innerHTML = html;
  }

  function wire(n) {
    var g = n.el, start = null, moved = false;

    g.addEventListener("pointerenter", function (e) { if (e.pointerType === "mouse" && !start) highlight(n.id); });
    g.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse" && !start) highlight(selected); });
    g.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(selected === n.id ? null : n.id); }
      if (e.key === "Escape") select(null);
    });

    g.addEventListener("pointerdown", function (e) {
      if (e.button) return;
      start = { x: e.clientX, y: e.clientY, nx: n.x, ny: n.y, s: W / svg.getBoundingClientRect().width };
      moved = false;
      g.setPointerCapture(e.pointerId);
    });
    g.addEventListener("pointermove", function (e) {
      if (!start) return;
      var dx = (e.clientX - start.x) * start.s, dy = (e.clientY - start.y) * start.s;
      if (!moved && dx * dx + dy * dy < 16) return;
      moved = true; n.fixed = true;
      n.x = Math.min(W - n.w / 2 - 2, Math.max(n.w / 2 + 2, start.nx + dx));
      n.y = Math.min(H - n.bottom - 2, Math.max(n.top + 2, start.ny + dy));
      if (n.hub) { n.ax = n.x; n.ay = n.y; }
      run(0.5);
    });
    function end() {
      if (!start) return;
      start = null; n.fixed = false;
      if (moved) run(0.3); else select(selected === n.id ? null : n.id);
    }
    g.addEventListener("pointerup", end);
    g.addEventListener("pointercancel", function () { start = null; n.fixed = false; });
  }

  // Animate the simulation for a short while (used while dragging).
  var energy = 0;
  function run(a) {
    energy = Math.max(energy, a);
    if (raf) return;
    (function frame() {
      tick(energy); place();
      energy *= 0.94;
      raf = energy > 0.02 ? requestAnimationFrame(frame) : null;
    })();
  }

  var lastW = 0, timer;
  function rebuild() {
    if (Math.abs(host.clientWidth - lastW) < 2) return;
    lastW = host.clientWidth;
    build();
  }
  window.addEventListener("resize", function () { clearTimeout(timer); timer = setTimeout(rebuild, 150); });
  document.addEventListener("click", function (e) {
    if (selected && e.target.closest && e.target.closest("#graph") && !e.target.closest(".node")) select(null);
  });

  // Label widths depend on the web fonts, so lay out once they are ready.
  if (document.fonts && document.fonts.ready) {
    var started = false, go = function () { if (!started) { started = true; rebuild(); } };
    document.fonts.ready.then(go);
    setTimeout(go, 1200);
  } else {
    rebuild();
  }
})();
