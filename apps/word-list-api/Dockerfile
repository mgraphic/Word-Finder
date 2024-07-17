FROM node:18.20.3-alpine

WORKDIR /app

COPY . .

RUN npm ci

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "prod"]
