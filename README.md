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

## Bundling script for the offline server and game

This is handled with [docker-compose](https://docs.docker.com/compose/).

Both this repo and the [Civic repo](https://github.com/hackoregon/civic) continuously deliver docker images to Hack Oregon's Elastic Container Registry. The `docker-compose.yml` file in this repo references those images by name, but expects you to provide the registry url.

## Distribution script for the offline server and game

### MacOS & Linux

To make it as easy as possible to get and start the docker images, the `get-game.sh` script is available on S3. Running the latest build of the game and web server takes three steps:

1. Download the script

```sh
$ curl -sO https://hacko-cdn.s3-us-west-2.amazonaws.com/earthquake-heroes/get-game.sh
```

2. Edit the script to provide values for the AWS environment variables. If you are meant to run the game, you'll have credentials.

3. Run the script

```sh
$ bash get-game.sh
```

### Windows

To make it as easy as possible to get and start the docker images, the `get-game.ps1` powershell script is available on S3. Running the latest build of the game and web server takes three steps:

1. Download the script

```powershell
PS:\> curl -Uri https://hacko-cdn.s3-us-west-2.amazonaws.com/earthquake-heroes/get-game.ps1 -OutFile get-game.ps1
```

2. Edit the script to provide values for the AWS environment variables. If you are meant to run the game, you'll have credentials.

3. Run the script

```powershell
PS:\> & .\get-game.ps1
```


**:warning: Note! These scripts require Docker and the AWS CLI to be installed already.**
