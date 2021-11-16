FROM nginx:latest
RUN rm -rf /usr/share/nginx/html/
COPY ./dist/bubble/ /usr/share/nginx/html/
EXPOSE 80
RUN ls /usr/share/nginx/html/
RUN ls /usr/share/nginx/html/assets/
RUN ls /etc/nginx/