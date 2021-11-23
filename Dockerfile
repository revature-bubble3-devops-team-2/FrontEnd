FROM nginx
RUN rm -f /usr/share/nginx/html/*
COPY ./dist/bubble/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/
RUN ls /usr/share/nginx/html/
EXPOSE 80