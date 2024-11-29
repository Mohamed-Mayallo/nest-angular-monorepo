# Nest-Angular Monorepo

## Configure your app

Create a new .env file in the `backend` repo and having the following values:

```javascript
NODE_ENV = development;
DB_URL = your - db - url;
JWT_SECRET = secret;
```

## Run tasks

Run Frontend using:

```sh
npx nx run frontend:serve:development
```

Run Backend using:

```sh
npx nx run backend:serve:development
```

## Try the functionality

Open a new browser tab and hit the following link:

```
http://localhost:4200
```
