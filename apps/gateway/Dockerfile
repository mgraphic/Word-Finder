FROM nginx:stable

# Delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/*

COPY ./nginx.conf.template /nginx.conf.template

EXPOSE 80

CMD ["/bin/sh" , "-c" , "envsubst < /nginx.conf.template > /etc/nginx/conf.d/default.conf && exec nginx -g 'daemon off;'"]
