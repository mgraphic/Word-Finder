<div align="center">

# Word Finder API and UI Application

<a href="https://blog.angular.dev/angular-v18-is-now-available-e79d5ac0affe"><img src="https://img.shields.io/badge/Built%20With%20Angular%20v18-blue?logo=angular&logoColor=white" alt="Angular 18" /></a> <a href="https://nodejs.org"><img src="https://img.shields.io/badge/NodeJS-v18.20.3-blue?logo=nodedotjs&logoColor=%23fff" alt="NodeJS v18.20.3" /></a> <a href="https://github.com/mgraphic/Word-Finder/actions/workflows/main.yml"><img src="https://github.com/mgraphic/Word-Finder/actions/workflows/build-publish-deploy.yml/badge.svg?branch=main" alt="Docker Publish" /></a>

<p>
    <strong>DEMO:</strong>
    <a href="http://word-finder.kmarshall.com">http://word-finder.kmarshall.com</a>
</p>

<p>
    <strong>DOCKER REPOSITORY:</strong>
    <a href="https://hub.docker.com/u/marshallgraphics">https://hub.docker.com/u/marshallgraphics</a>
</p>

</div>

<br />

## Installing & Running Locally

### Word List API

From the terminal, cd into the app directory and install the Node packages and run the application.

```bash
cd apps/word-list-api
npm ci
npm start
```

### Word Finder UI

1. From the terminal, cd into the app directory and install the Node packages and run the application.

    ```bash
    cd apps/word-finder-ui
    npm ci
    npm run serve
    ```

2. Open the application in your browser: http://localhost:4200

---

## Running From Docker

1. From the terminal, run the docker compose command.

    <br/>_Option 1 - Run the app from images pulled from the Docker Hub repositoy:_

    ```bash
    docker-compose up -d
    ```

    _Option 2 - Run the app by building images from this codebase:_

    ```bash
    docker-compose up --build -d
    ```

2. Open the application in your browser: http://localhost
