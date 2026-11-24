// Theme toggle, publication filters, and the hidden smiley in the cosmic web.
(function () {
  "use strict";

  // — Theme toggle (follows the system until the visitor picks one)
  var root = document.documentElement;
  var toggle = document.querySelector(".theme-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var dark = root.dataset.theme
        ? root.dataset.theme === "dark"
        : window.matchMedia("(prefers-color-scheme: dark)").matches;
      var next = dark ? "light" : "dark";
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      document.dispatchEvent(new CustomEvent("themechange"));
    });
  }

  // — Publication filters
  var chips = document.querySelectorAll(".chip[data-filter]");
  var list = document.getElementById("pubs");
  if (chips.length && list) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var f = chip.dataset.filter;
        chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        list.querySelectorAll(".pub").forEach(function (li) {
          li.hidden = !(f === "all" || li.dataset.area === f);
        });
      });
    });
  }

  // — Cosmic web: now and then a small galaxy smiles, a different one each time
  var faces = document.querySelectorAll(".cosmic-web .cw-face");
  if (faces.length) {
    var rnd = function (a, b) { return a + Math.random() * (b - a); };
    var last = -1;
    var show = function () {
      var i = Math.floor(Math.random() * faces.length);
      if (faces.length > 1 && i === last) i = (i + 1) % faces.length;
      last = i;
      faces[i].classList.add("on");
      setTimeout(function () {
        faces[i].classList.remove("on");
        setTimeout(show, rnd(6000, 18000));
      }, rnd(3500, 6000));
    };
    setTimeout(show, rnd(2500, 8000));
  }
})();
