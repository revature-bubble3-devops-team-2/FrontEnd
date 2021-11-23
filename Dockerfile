FROM nginx:latest
COPY ./dist/bubble/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/
RUN nginx -V
RUN netstat -a | grep "80"
RUN nginx -s reload
EXPOSE 80