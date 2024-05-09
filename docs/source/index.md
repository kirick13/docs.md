
# docs.md

`docs.md` is a simple documentation generator based on Markdown and EJS.

Create some markdown files, launch compiler and serve compiled HTML files by any webserver, even by Python's `http.server`.

Extend your `.md` files using [EJS syntax](https://ejs.co) such as `import()` to include other `.md` files.

Compiled HTML pages are extremely fast and lightweight. There is **no JavaScript** code. No reactivity. No frameworks. Just HTML and CSS.

## Getting started

To use `docs.md`, you need to have [Docker](https://docs.docker.com/get-docker/) installed.

<aside info>

🚧 In the near future, it will be possible to compile using [Bun](https://bun.sh) by installing package from npm.

</aside>

To start, just create `source/index.md` file:

```markdown
# Hello, world!

This is a simple documentation website created with `docs.md`.
```

And run the compiler using Docker container. Bind two directories:
- `/var/docs.md/source` with your source files;
- `/var/docs.md/build` with your build directory.

```bash
docker run --rm \
           -v "$PWD/source:/var/docs.md/source:ro" \
           -v "$PWD/build:/var/docs.md/build" \
           kirickme/docs.md
```

After that, serve your `build` directory using any webserver. For example, start Python's `http.server`:

```bash
cd build
python3 -m http.server
```

And open `http://localhost:8000` in your browser.

### Use as build stage

You can easily use `docs.md` as a build stage in your Dockerfile:

```dockerfile
FROM kirickme/docs.md AS builder
COPY source /var/docs.md/source
RUN  docs.md

FROM nginx:1.25.0-alpine
COPY --from=builder /var/docs.md/build /usr/share/nginx/html
```

## File types other than Markdown

Starting from version `0.3.0`, `docs.md` uses all the following files:

- `.md` files will be compiled to HTML pages;
  - HTML files will be also minified using [minify-html](https://www.npmjs.com/package/@minify-html/node);
- `/config.yml` file will be used as configuration file;
- `.css` files will be bundled with core styles into `css/style.css` file;
  - CSS files will be also minified using [clean-css](https://www.npmjs.com/package/clean-css);
- `.scss` files will be compiled to `.css` and after that will be processed as `.css` files;
- some types of files will be copied to `build` directory as is:
  - `.js` scripts;
  - `.woff2` fonts;
  - `.jpg`, `.jpeg`, `.png`, `.svg` and `.webp` images.

Also, `.html` and `.css` files will be gzipped.
