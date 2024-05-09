
# Changelog

<aside info>

That website is on version **<%= locals.docsmd.version %>**.

</aside>

## 0.3.0 &nbsp; <small>8 May 2024</small>

Major update with breaking changes:

- new fresh design with larger fonts and more space;
- new, faster compiler based on [Calpis](https://github.com/kirick13/calpis) instead of Gulp;
- removed file structure requiremets;
  - support for different file types to compile;
- config now is in `config.yml` file;
- new, more readable syntax for "Parameters" custom element
  - also, there is a new design for it;
- new syntax for defining code samples;
  - it is now possible to define multiple code samples in one article;
  - support for multiple languages in one code sample — and selecting them using dropdown.
- all new Navigation section with collapsable categories.

## 0.2.1 &nbsp; <small>14 Jun 2023</small>

Hotfix.

## 0.2.0 &nbsp; <small>13 Jun 2023</small>

Minor refactor:

- added Docker image to Docker Hub;
- for now, the only way to compile your docs is to run Docker image.

## 0.1.1 &nbsp; <small>22 May 2022</small>

Quick fixes:

- fixed generator of the "Parameters" custom element;
- changed image of Node.js inside Dockerfile;
- fixed gulpfile .html removal;
- fixed logo height;
- fixed grid view on tablets;
- added roadmap.

## 0.1.0 &nbsp; <small>21 May 2022</small>

Initial release
