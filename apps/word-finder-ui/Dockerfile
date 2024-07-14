FROM node:18.20.3-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
# RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

COPY . .
RUN npm run build
FROM nginx:stable
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/word-finder /usr/share/nginx/html
# EXPOSE 80
EXPOSE 3000
