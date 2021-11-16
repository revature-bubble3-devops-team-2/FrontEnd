FROM nginx
COPY ./dist/bubble/* /usr/share/nginx/html/
EXPOSE 80