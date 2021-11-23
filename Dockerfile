FROM nginx
COPY ./dist/bubble/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN chmod -R 615 /usr/share/nginx/html/
EXPOSE 80