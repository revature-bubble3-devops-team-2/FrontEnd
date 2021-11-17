FROM nginx:latest
# COPY ./dist/bubble/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx","-g","daemon","off"]