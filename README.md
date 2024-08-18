<div align="center">

# Word Finder API and UI Application

<a href="https://blog.angular.dev/angular-v18-is-now-available-e79d5ac0affe"><img src="https://img.shields.io/badge/Built%20With%20Angular%20v18-blue?logo=angular&logoColor=white" alt="Angular 18" /></a> <a href="https://nodejs.org"><img src="https://img.shields.io/badge/NodeJS-v18.20.3-blue?logo=nodedotjs&logoColor=%23fff" alt="NodeJS v18.20.3" /></a> <a href="https://github.com/mgraphic/Word-Finder/actions/workflows/main.yml"><img src="https://github.com/mgraphic/Word-Finder/actions/workflows/main.yml/badge.svg?branch=main" alt="Deploy To Digital Ocean" /></a>

<strong>DEMO: http://word-finder.kmarshall.com</strong>

</div>

<br />

## Installing & Running Locally

### Word List API

1. Create a `.env` file inside the apps/word-list-api and create an environment varible for the shared access token.

    _Example:_

    ```text
    ACCESS_TOKEN=super-secret-access-token
    ```

2. From the terminal, cd into the app directory and install the Node packages and run the application.

    ```bash
    cd apps/word-list-api
    npm ci
    npm start
    ```

### Word Finder UI

1. Create a `.env` file inside the apps/word-finder-ui and create an environment varible for the shared access token.

    _Example:_

    ```text
    ACCESS_TOKEN=super-secret-access-token
    ```

2. From the terminal, cd into the app directory and install the Node packages and run the application.

    ```bash
    cd apps/word-finder-ui
    npm ci
    npm run serve
    ```

3. Open the application in your browser: http://localhost:4200

---

## Running From Docker

1. Create a `.env` file inside this root folder and create an environment varible for the shared access token.

    _Example:_

    ```text
    ACCESS_TOKEN=super-secret-access-token
    ```

2. From the terminal, run the docker compose command.

    ```bash
    docker-compose up --build -d
    ```

3. Open the application in your browser: http://localhost
