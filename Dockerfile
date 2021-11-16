FROM nginx:latest
COPY ./dist/bubble/*.* /usr/share/nginx/html/
EXPOSE 80