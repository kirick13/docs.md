FROM kirickme/docs.md:0.3.0-beta.2 AS builder
COPY source /var/docs.md/source
RUN  docs.md

FROM nginx:1.25.0-alpine
COPY --from=builder /var/docs.md/build /var/www/html
COPY nginx.conf /etc/nginx/nginx.conf
