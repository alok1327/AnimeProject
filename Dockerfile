# Use the latest Nginx image from Docker Hub
FROM nginx:latest

# Copy your HTML, CSS, and JS files to the Nginx default directory
COPY index.html /usr/share/nginx/html/index.html
COPY styles.css /usr/share/nginx/html/styles.css
COPY script.js /usr/share/nginx/html/script.js

# Expose port 80 to the outside world
EXPOSE 80
