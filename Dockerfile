FROM nginx
RUN rm -f /usr/share/nginx/html/*
COPY ./dist/bubble/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/
RUN sudo -u www-data stat /usr/share/nginx/html/
EXPOSE 80