FROM nginx
COPY ./dist/bubble/ /usr/share/nginx/html/
# COPY default.conf /etc/nginx/conf.d/
RUN getenforce
EXPOSE 80