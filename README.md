# Remix federation experiment

## Structure

- remix-remote: The remote app
- remix-host: The host consuming that remote

The remote app doesn't need a running express server.
The host express server will consume only its JS server bundle, and serve its public resource on its own path.

## How to run locally in dev mode

### Clone and build Remix fork with [`yalc`](https://www.npmjs.com/package/yalc)

Clone the [Remix fork](https://github.com/adrienbaron/remix), then run:

```
cd remix
yarn install
yarn build
cd build/node_modules/@remix-run/dev
npx yalc publish
```

### Install Remix dev locally with yalc

```
cd remix-remote
npx yalc add @remix-run/dev
npm i
```

```
cd remix-host
npx yalc add @remix-run/dev
npm i
```

### Start building remote

```
cd remix-remote
npm i
npm run dev
```

### Start building host
```
cd remix-host
npm i
npm run dev
```

### Serve host
```
cd remix-host
npm run start:dev
```
