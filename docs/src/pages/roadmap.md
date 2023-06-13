
# Roadmap

## Building

- Replace `gulp-web-compress` with Node.js' `zlib`.
  - Revert `node` Docker image to `node-alpine`.
- Remove gulp, replace it with node.js scripts to achieve better performace.
- Publish docker image to Docker Hub.

# UI

- Move `:root` variables (e.g. `--color-*`) from `style.scss` to `config.json`.
- Add collapse button to navigation blocks.
  - Add `config.json` option with default state of the block: collapsed or not.
