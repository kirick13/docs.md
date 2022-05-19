
# Getting started

It's really easy to get started with `docs.md`:

1. **fork** this [repository](https://github.com/kirick13/docs.md) on GitHub;
2. clone **your forked repository** to your local machine;
3. `cd docs.md`;
4. run `sh ./build.sh` to compile our default documentation;
5. serve contents of the `build` folder using any web server.

## Creating your own documentation

After installation, you can edit contents of `source` directory. There are three directories:
- `source/pages` contains `.md` files that will be compiled to HTML pages;
- `source/includes` contains `.md` files that will be included to your pages: none of these files will become HTML pages;
- `source/images` contains images that you can use on your website: that images will be cloned to `build/img` folder *as is*.

## Building

Just run `sh ./build.sh` to compile your sources. It can run in two possible ways:

1. if you have Node.js installed, it will compile sources right on your local machine;
2. if you have Docker installed, it will start a Docker container and compile sources there.

So, you have to have either Node.js or Docker installed.
