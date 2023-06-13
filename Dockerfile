FROM    node:18.16.0 AS builder
WORKDIR /app
COPY    src .
RUN     npm install --omit=dev \
        && npx browserslist@latest --update-db \
        && npm cache clean --force

FROM    node:18.16.0-slim
WORKDIR /app
COPY    --from=builder /app .
COPY    entrypoint.sh /usr/local/bin/docs.md
CMD     /entrypoint.sh
