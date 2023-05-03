#!/usr/bin/env bash
rm -rf ./dist
pnpm exec tsc
pnpm exec mkdirp ./dist
node ./dist/api.js > ./dist/openapi.json
rm ./dist/api.js ./dist/api.d.ts