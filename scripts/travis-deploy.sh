#!/bin/bash

docker push michaelkoconnor/chatty-cathy

PACKAGE_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

echo $PACKAGE_VERSION

kubectl set image deployments/chatty-cathy-deployment chatty-cathy=michaelkoconnor/chatty-cathy:$PACKAGE_VERSION