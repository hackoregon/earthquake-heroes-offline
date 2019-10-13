if [ -f "tiles/tiles.mbtiles" ]; then
  echo "Tiles already generated."
  exit 0;
fi

mkdir -p tiles
time tl copy -z 10 -Z 15 \
  -b "-123.2762 45.1926 -122.1817 45.8201" \
  "https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v7/{z}/{x}/{y}.vector.pbf?access_token=$MAPBOX_TOKEN" \
  mbtiles://./tiles/tiles.mbtiles
