const path = require("path")
const fs = require("fs")
const express = require("express")
const compression = require("compression")
const morgan = require("morgan")
const {createRequestHandler} = require("@remix-run/express")
const requireFromString = require('require-from-string')

const MODE = process.env.NODE_ENV
const BUILD_DIR = path.join(process.cwd(), "server/build")

const app = express()
app.use(compression())

// You may want to be more aggressive with this caching
app.use(express.static("public", {maxAge: "1h"}))
app.use(express.static("../remix-remote/public", {maxAge: "1h"}))

// Remix fingerprints its assets so we can cache forever
app.use(express.static("public/build", {immutable: true, maxAge: "1y"}))

const getBuild = () => {
  const remoteBuildBundle = fs.readFileSync(path.join(process.cwd(), "../remix-remote/server/build/index.js"))

  const remoteBuild = requireFromString(remoteBuildBundle.toString("utf-8"), path.join(BUILD_DIR, "./index.js"))
  const localBuild = require("./build")

  const addRemoteBuild = (localBuild, remoteBuild) => {
    return {
      ...localBuild,
      assets: {
        ...localBuild.assets,
        routes: {
          ...remoteBuild.assets.routes,
          ...localBuild.assets.routes,
        },
        url: "/manifest.js"
      },
      routes: {
        ...remoteBuild.routes,
        ...localBuild.routes,
      }
    }
  }

  return addRemoteBuild(localBuild, remoteBuild)
}

let build = getBuild();

app.use(morgan("tiny"))

app.get("/manifest.js", (req, res) => {
  res.send(`window.__remixManifest = ${JSON.stringify(build.assets, undefined, 2)}`)
})

app.all(
  "*",
  MODE === "production"
    ? createRequestHandler({build})
    : (req, res, next) => {
      purgeRequireCache()
      build = getBuild();
      return createRequestHandler({build, mode: MODE})(req, res, next)
    }
)

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`)
})

////////////////////////////////////////////////////////////////////////////////
function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, we prefer the DX of this though, so we've included it
  // for you by default
  for (const key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key]
    }
  }
}
