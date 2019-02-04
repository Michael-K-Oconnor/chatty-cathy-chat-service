#!/bin/bash

PREV_VERSION=$(curl https://raw.githubusercontent.com/Michael-K-Oconnor/Chatty-Cathy/master/package.json \
  | grep version \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

CURR_VERSION=$(cat package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')


echo $PREV_VERSION
echo $CURR_VERSION

[ $PREV_VERSION != $CURR_VERSION ]