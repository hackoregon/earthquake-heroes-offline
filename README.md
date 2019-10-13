# Earthquake Heroes Offline

[![Build Status](https://travis-ci.org/hackoregon/earthquake-heroes-offline.svg?branch=master)](https://travis-ci.org/hackoregon/earthquake-heroes-offline)

This repo has three things.

1. A data pipeline for generating offline map tiles
2. A simple web server for serving tiles and some API endpoints
3. A bundling and distribution script for both the web server and the game

:warning: If you are looking for source code for the Earthquake Heroes game, checkout the
[Civic repo](https://github.com/hackoregon/civic).

## Data pipeline for generating offline map tiles

The data pipeline uses a combination of `tl`, `@mapbox/mbtiles`, and `tilelive-http` to scrape a Mapbox tileset.

**To run the pipeline** first install all three dependencies:

```sh
$ npm i -g tl @mapbox/mbtiles tilelive-http
```

Then make sure to have a `MAPBOX_TOKEN` in your env.

```sh
$ export MAPBOX_TOKEN=<token>
```

Then run `pipeline.sh`

```sh
$ ./pipeline.sh
```

This will create a `tiles.mbtiles` file which is used by the web server.

## Web server for serving tiles and some API endpoints

The web server is a simple express server with some endpoints serving static JSON (for the API responses)
and protobuf-based vector tiles out of the `tiles.mbtiles` file that is generated from the data pipeline.

**To start the web server** run `index.js`:

```js
$ node index.js
```

The output of `index.js` will include the API address.

To use this tile server with Civic's `BaseMap`, set the low-level `mapGlOptions` to override theme and
API urls:

```jsx
<BaseMap
  mapGLOptions={{
    mapboxApiUrl: "http://localhost:3456/tiles",
    mapStyle: "mapbox://styles/disaster"
  }}
/>
```
