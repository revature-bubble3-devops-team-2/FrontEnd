FROM nginx:latest
COPY ./dist/bubble/ /usr/share/nginx/html/
COPY default.conf /etc/nginx/conf.d/
RUN nginx -V
RUN ls /etc/nginx/
RUN cat /etc/nginx/nginx.conf
RUN cat /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]