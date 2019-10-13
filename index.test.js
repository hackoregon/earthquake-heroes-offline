const MBTiles = require("@mapbox/mbtiles");
const request = require("supertest");
const test = require("ava");
const fs = require("fs");
const zlib = require("zlib");

test.beforeEach(t => {
  t.context = require("./index");
});

test("themes are returned verbatim from the themes directory", async t => {
  const res = await request(t.context).get("/tiles/styles/1/disaster");
  const expectation = fs.readFileSync("./themes/disaster.json");
  t.is(res.status, 200);
  t.deepEqual(res.body, JSON.parse(expectation));
});

test("the /styles/ segment in the theme URL is optional", async t => {
  const res = await request(t.context).get("/tiles/1/disaster");
  const expectation = fs.readFileSync("./themes/disaster.json");
  t.is(res.status, 200);
  t.deepEqual(res.body, JSON.parse(expectation));
});

test("the sprite.json endpoint is mocked to satisfy mapbox style loading", async t => {
  const res = await request(t.context).get(
    "/tiles/styles/1/disaster/sprite.json"
  );
  t.is(res.status, 200);
  t.deepEqual(res.body, {});
});

test("the sprite.png endpoint is mocked with a static png to satisfy mapbox style loading", async t => {
  const res = await request(t.context).get(
    "/tiles/styles/1/disaster/sprite.png"
  );
  t.is(res.status, 200);
  t.deepEqual(res.body, fs.readFileSync("./themes/sprite.png"));
});

test("map tiles are served appropriately out of the mbtiles archive", async t => {
  // Sample coordinates that MUST be in the mbtiles archive
  const [z, x, y] = [12, 657, 1463];
  const res = await request(t.context).get(`/tiles/1/tiles/${z}/${x}/${y}.pbf`);
  const expectation = await getTile(z, x, y);

  t.is(res.status, 200);
  t.is(res.text, expectation.toString());
});

// Promise-based helper to read a tile out of an mbtiles archive
function getTile(z, x, y) {
  return new Promise((resolve, reject) => {
    new MBTiles("./tiles/tiles.mbtiles", (err, mbtiles) => {
      if (err) {
        reject(500);
      } else {
        mbtiles.getTile(z, x, y, (err, tile, headers) => {
          if (err) {
            reject(404);
          } else {
            // Tiles are gzip-encoded so they must be unzipped for equivalence assertions
            zlib.gunzip(tile, (err, unzipped) => {
              resolve(unzipped);
            });
          }
        });
      }
    });
  });
}
