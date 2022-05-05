FROM nginx
COPY ./dist/bubble/ /usr/share/nginx/html/
RUN rm -rf /etc/nginx/conf.d/default.conf
COPY ./nginx.conf /etc/nginx/conf.d
RUN chmod -R 615 /usr/share/nginx/html/
EXPOSE 80