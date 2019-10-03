# Earthquake Heroes Offline

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
