#!/bin/bash

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo $PACKAGE_VERSION

docker build -t michaelkoconnor/chatty-cathy:$PACKAGE_VERSION .

docker run -d -p 4000:4000 \
  -e NODE_ENV=test \
  -e DB_HOST=${DB_HOST} \
  -e DB_PASS=${DB_PASS} \
  -e DB_USER=${DB_USER} \
  --name=chatty-cathy michaelkoconnor/chatty-cathy
docker ps
docker exec chatty-cathy npm test