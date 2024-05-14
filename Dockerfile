
# ----------------------------------------------
# ----- STAGE 1: Extract dependencies list -----
# ----------------------------------------------

# But why?
# We want to avoid costly node_modules installation and compilation of @minify-html/node if there is no changes in dependencies list.
# If we just changed version name and not dependencies, why re-run modules installation?

FROM    jetbrainsinfra/jq AS jq
WORKDIR /app
COPY    source/package.json .
RUN     jq '{dependencies:.dependencies}' package.json > package.dependencies.json

# --------------------------------------------
# ----- STAGE 2: Installing node_modules -----
# --------------------------------------------

FROM    oven/bun:1.1.6-debian AS build
WORKDIR /app
# install rust to build @minify-html/node
RUN     apt-get update && apt-get -y install build-essential curl libssl-dev pkg-config
RUN     curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV     PATH="/root/.cargo/bin:${PATH}"
# install dependencies
COPY    --from=jq /app/package.dependencies.json package.json
RUN     bun install
RUN     cd node_modules/@minify-html/node && bun run --bun build
RUN     rm -rf node_modules/@minify-html/node/target/debug

# ----------------------------
# ----- STAGE 3: Packing -----
# ----------------------------

FROM    oven/bun:1.1.6-slim
WORKDIR /app
# copy source code
COPY    source/ ./
# copy node_modules
COPY    --from=build /app/node_modules node_modules
# copy executable
COPY    entrypoint.sh /usr/local/bin/docs.md
CMD     docs.md
