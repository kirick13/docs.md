FROM kirickme/docs.md:0.2.0-beta.9 AS builder
COPY src /var/docs.md/source
RUN  mkdir -p /var/docs.md/build \
     && /entrypoint.sh

FROM nginx:1.25.0-alpine
COPY --from=builder /var/docs.md/build /var/www/html
COPY nginx.conf /etc/nginx/nginx.conf
