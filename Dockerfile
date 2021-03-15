FROM node:13.12.0-alpine

RUN mkdir -p /usr/src/TextPad
WORKDIR /usr/src/TextPad

COPY package.json /usr/src/TextPad
# COPY package-lock.json ./

RUN npm install 

COPY . /usr/src/TextPad
RUN npm run build
# EXPOSE 8080
COPY ./nginx.config /etc/nginx/nginx.template
CMD ["/bin/sh", "-c", "envsubst < /etc/nginx/nginx.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
# COPY --from=builder /usr/src/TextPad/build /usr/share/nginx/html