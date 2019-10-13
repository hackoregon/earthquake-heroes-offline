const express = require("express");
const cors = require("cors");
const MBTiles = require("@mapbox/mbtiles");
const path = require("path");
const fs = require("fs");

const app = express();

app.use(cors());

app.get("/tiles/:version/tiles/:z/:x/:y.pbf", function(req, res) {
  const { z, x, y } = req.params;
  new MBTiles(path.join(__dirname, "tiles", "tiles.mbtiles"), function(
    err,
    mbtiles
  ) {
    if (err) {
      res.header("Content-Type", "text/plain");
      res.status(500).send(`Tile error: ${err}`);
    } else {
      mbtiles.getTile(z, x, y, function(err, tile, headers) {
        if (err) {
          res.header("Content-Type", "text/plain");
          res.status(404).send(`Tile error ${err}`);
        } else {
          res.set(headers);
          res.send(tile);
        }
      });
    }
  });
});

const themeHandler = function(req, res) {
  let theme = req.params.theme;
  if (!theme.endsWith(".json")) {
    theme = theme + ".json";
  }
  const filePath = path.join(__dirname, "themes", theme);
  fs.readFile(filePath, "utf8", function(err, file) {
    if (err) {
      res.status(500);
      res.json({ status: 500, message: `Could not load theme: ${err}` });
    } else {
      try {
        res.json(JSON.parse(file));
      } catch (err) {
        res.status(500);
        res.json({ status: 500, message: `Could not load theme: ${err}` });
      }
    }
  });
};

app.get("/tiles/styles/:version/:theme", themeHandler);
app.get("/tiles/:version/:theme", themeHandler);

app.get("/tiles/styles/:version/:theme/sprite.json", function(req, res) {
  res.json({});
});

app.get("/tiles/styles/:version/:theme/sprite.png", function(req, res) {
  const reader = fs.createReadStream(
    path.join(__dirname, "themes", "sprite.png")
  );
  reader.on("open", () => {
    res.header("Content-Type", "image/png");
    reader.pipe(res);
  });
  reader.on("error", err => {
    res.header("Content-Type", "text/plain");
    res.status(500).end(`Error: ${err}`);
  });
});

console.log("Starting API and Tile Server\n");
console.log(`Use this as your mapboxApiUrl: http://localhost:3456/tiles`);

app.listen(3456);

module.exports = app;
