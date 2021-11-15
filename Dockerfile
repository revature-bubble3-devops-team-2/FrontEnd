FROM nginx
COPY ./dist/* /usr/share/nginx/html
RUN ls /etc/nginx/conf.d/default.conf
EXPOSE 80