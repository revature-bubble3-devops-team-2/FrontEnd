FROM nginx:latest
COPY ./dist/bubble/* /usr/share/nginx/html/
COPY ./dist/bubble/assets/* /usr/share/nginx/html/assets/
EXPOSE 80