FROM kirickme/docs.md:0.2.1 AS builder
COPY src /var/docs.md/source
RUN  docs.md

FROM nginx:1.25.0-alpine
COPY --from=builder /var/docs.md/build /var/www/html
COPY nginx.conf /etc/nginx/nginx.conf
