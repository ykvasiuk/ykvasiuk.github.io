# [ykvasiuk.github.io](https://ykvasiuk.github.io/)

Personal website of Yurii Kvasiuk. A small hand-written Jekyll site, built by GitHub Pages.

## Editing

| To change…               | Edit                                             |
| ------------------------ | ------------------------------------------------ |
| Home page text           | `index.html`                                     |
| Publications             | `_data/publications.yml` (newest first)          |
| Talks and teaching       | `_data/talks.yml`                                |
| Concept map              | `_data/graph.yml`                                |
| Profile links            | `_data/profiles.yml`                             |
| Research areas           | `_data/areas.yml`                                |
| Research page entries    | `_projects/*.md` (title, `excerpt`, `area`, `order`) |
| Colours, fonts, layout   | `assets/css/main.css` (tokens at the top)        |

A paper's `key` in `publications.yml` is what the concept map refers to in `papers: [...]`,
and its `project:` path ties it to an entry in `_projects/`. Only the title and excerpt of each entry are shown;
set `output: true` under `collections.projects` in `_config.yml` to publish the full write-ups as pages again.

## Preview locally

```bash
LC_ALL=en_US.UTF-8 jekyll serve
```

Then open <http://localhost:4000>.
