FROM nginx:alpine
COPY ./dist/bubble/ /usr/share/nginx/html/
EXPOSE 80