
FROM node:18.2.0

COPY package /var/docs.md/package

WORKDIR /var/docs.md/package

RUN npm install

CMD npx gulp build
