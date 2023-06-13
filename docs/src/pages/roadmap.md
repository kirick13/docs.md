
# Roadmap

## Building

- Create a builder to replace Gulp,
  - remove as many dependencies as possible to reduce image size.
- Compile own CSS/JS files during Docker image build.
- Support for custom CSS files.

# UI

- Move `:root` variables (e.g. `--color-*`) from `style.scss` to `config.json`.
- Add collapse button to navigation blocks.
  - Add `config.json` option with default state of the block: collapsed or not.
