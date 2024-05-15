
# ------------------------------------------------------
# ----- STAGE 1: Get precompiled @minify-html/node -----
# ------------------------------------------------------

# But why?
# We want to avoid costly compilation of @minify-html/node.
# So we precompiled it to a separate docker image.

FROM kirickme/minify-html AS minify-html

# --------------------------------------------
# ----- STAGE 2: Installing node_modules -----
# --------------------------------------------

FROM    oven/bun:1.1.6-slim AS build
WORKDIR /app
# install dependencies
COPY    source/package.json .
COPY    source/bun.lockb    .
RUN     bun install --production
COPY    --from=minify-html /index.node node_modules/@minify-html/node

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
