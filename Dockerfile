FROM nginx:latest
COPY index.html styles.css script.js /usr/share/nginx/html/index.html
EXPOSE 80
