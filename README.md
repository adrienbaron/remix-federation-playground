# Remix federation experiment

## Structure

- remix-remote: The remote app
- remix-host: The host consuming that remote

The remote app doesn't need a running express server.
The host express server will consume only its JS server bundle, and serve its public resource on its own path.

## How to run locally in dev mode

### Start remote

```
cd remix-remote
npm i
npm run dev
```

### Start host
```
cd remix-host
npm i
npm run dev
```

```
cd remix-host
npm run start:dev
```