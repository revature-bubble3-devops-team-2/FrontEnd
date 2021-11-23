FROM nginx:1.21.4
COPY ./dist/bubble/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/
EXPOSE 80