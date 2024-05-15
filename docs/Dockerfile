ARG DOCS_MD_VERSION

FROM kirickme/docs.md:$DOCS_MD_VERSION AS builder
COPY source /var/docs.md/source
RUN  docs.md

FROM nginx:1.25.0-alpine
COPY --from=builder /var/docs.md/build /var/www/html
COPY nginx.conf /etc/nginx/nginx.conf
