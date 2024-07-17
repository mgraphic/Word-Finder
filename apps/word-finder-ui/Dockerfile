FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
# RUN npx ngcc --properties es2023 browser module main --first-only --create-ivy-entry-points

COPY . .
ARG ACCESS_TOKEN
ENV NG_APP_ACCESS_TOKEN $ACCESS_TOKEN
RUN npm run build
FROM nginx:stable
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/word-finder/browser /usr/share/nginx/html
EXPOSE 3000
