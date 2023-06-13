
# Getting started

It's really easy to get started with `docs.md`.

## File structure

Create a file structure as following:

```
📁 <your directory>
├─ 📁 source
│  ├─ 📁 images
│  ├─ 📁 includes
│  ├─ 📁 pages
│  └─ 📄 config.json
└─ 📁 build
```

There are three directories inside a `source` directory:
- `source/pages` contains `.md` files that will be compiled to HTML pages;
- `source/includes` contains `.md` files that can be included to your pages: none of these files will become HTML pages;
- `source/images` contains images that you can use on your documentation: that images will be cloned to `build/img` folder *as is*.

File `source/config.json` contains configuration of your documentation website. You can read more about it in [Configuration](/configuration/general.html) section.

## Building

Run `kirickme/docs.md` Docker image to compile your documentation website. Bind `source` and `build` directories to it:

```bash
docker run --rm \
           -v $PWD/source:/var/docs.md/source \
           -v $PWD/build:/var/docs.md/build \
           kirickme/docs.md:<%= $package.version %>
```

Or build a Docker image with your own docs:

```dockerfile
FROM kirickme/docs.md:<%= $package.version %> as builder
COPY source /var/docs.md/source
RUN  docs.md

FROM nginx:1.25.0-alpine
COPY --from=builder /var/docs.md/build /var/www/html
# add nginx config and other stuff if you want
```
