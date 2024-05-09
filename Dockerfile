
# -------------------
# ----- STAGE 1 -----
# -------------------

FROM    oven/bun:1.1.6-debian AS build
WORKDIR /app
# install rust to build @minify-html/node
RUN     apt-get update && apt-get -y install build-essential curl libssl-dev pkg-config
RUN     curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
ENV     PATH="/root/.cargo/bin:${PATH}"
# install dependencies
COPY    source/package.json .
COPY    source/bun.lockb    .
RUN     bun install --production
RUN     cd node_modules/@minify-html/node && bun run --bun build
RUN     rm -rf node_modules/@minify-html/node/target/debug

# -------------------
# ----- STAGE 2 -----
# -------------------

FROM    oven/bun:1.1.6-slim
WORKDIR /app
# copy source code
COPY    source/ ./
# copy node_modules
COPY    --from=build /app/node_modules node_modules
# copy executable
COPY    entrypoint.sh /usr/local/bin/docs.md
CMD     docs.md
