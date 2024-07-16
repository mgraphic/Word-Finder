FROM nginx:stable

# Delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/*

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
