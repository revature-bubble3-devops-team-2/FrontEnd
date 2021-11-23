FROM nginx:latest
COPY ./dist/bubble/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/
RUN nginx -V
EXPOSE 80