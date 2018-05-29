#!/bin/bash
rsync -av --delete \
  --exclude 'node_modules' \
  --exclude 'content' \
  --exclude '.git' \
  --exclude '.expo' \
  --exclude 'artwork' \
  --exclude 'scripts' \
  --filter 'protect scripts' \
  --filter 'protect sync.sh' \
  --filter 'protect templatize.js' \
  --filter 'protect content-source' \
  --filter 'protect LICENSE' \
  --filter 'protect README.md' \
  ../identifly-app/ ./

./templatize.js