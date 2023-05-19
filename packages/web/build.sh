#! /usr/bin/env bash

rm -R build/cache
rm -R build/server
find build -type f -name "*" -print0 | xargs -0 sed -i '' -e 's/_buildManifest.js/build-manifest.js/g'
find build -type f -name "*" -print0 | xargs -0 sed -i '' -e 's/_ssgManifest.js/ssg-manifest.js/g'
find build -type f -name "*" -print0 | xargs -0 sed -i '' -e 's/_middlewareManifest.js/middleware-manifest.js/g'
mv build/static/glob-friendly-id/_buildManifest.js build/static/glob-friendly-id/build-manifest.js
mv build/static/glob-friendly-id/_ssgManifest.js build/static/glob-friendly-id/ssg-manifest.js
mv build/static/glob-friendly-id/_middlewareManifest.js build/static/glob-friendly-id/middleware-manifest.js
mv build/serverless/pages/* build
rm -R build/serverless
cp -R public/* build
mkdir build/_next
mv build/static build/_next
rm -R build/pool
rm -R build/_next/static/chunks/pages/pool