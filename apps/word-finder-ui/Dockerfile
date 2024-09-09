# Building Container:
FROM node:18.20.3-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
# RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points
COPY . .
ENV NG_APP_ACCESS_TOKEN ""
RUN npm run build

# Running Container:
FROM nginx:stable
# Delete the default welcome to nginx page.
RUN rm /usr/share/nginx/html/*
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/word-finder/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
