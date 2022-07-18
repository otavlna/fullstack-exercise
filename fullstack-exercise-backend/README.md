## Installation

```bash
$ npm install
```

## Running the app

Development and production modes use different databases.
Development mode preseeds database with [2 user accounts](#protected-endpoints).

### Running in development mode

1. Build docker container
```bash
$ docker compose -f docker-compose.dev.yml --env-file=.development.env build
```
2. Run
```bash
$ docker compose -f docker-compose.dev.yml --env-file=.development.env up
```
#### Running in development mode with docker volumes recreated

In development it might sometimes be useful to reinstall node_modules and clear database. For that just add -V flag
```bash
$ docker compose -f docker-compose.dev.yml --env-file=.development.env up -V
```

### Running in production mode

1. Build docker container
```bash
$ docker compose -f docker-compose.prod.yml --env-file=.production.env build
```
2. Run
```bash
$ docker compose -f docker-compose.prod.yml --env-file=.production.env up
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## API documentation

The API documentation is available after app startup at [localhost:1337/api](localhost:1337/api).

### Protected endpoints

Generate access token on /auth/login using one of the two development-mode-only preseeded identities:

```
{
  "username": "user1",
  "password": "password"
}
```
OR
```
{
  "username": "user2",
  "password": "password"
}
```

