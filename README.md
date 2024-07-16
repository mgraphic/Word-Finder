# Word Finder API and UI Application

_Developed with NodeJS V18.20.3_

---

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
