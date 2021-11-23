FROM nginx:latest
COPY ./dist/bubble/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/
RUN nginx -V
RUN semanage port -a -t http_port_t -p tcp 80
RUN nginx -s reload
EXPOSE 80