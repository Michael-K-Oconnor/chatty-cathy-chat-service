#!/bin/bash

docker push michaelkoconnor/chatty-cathy

# kubectl set image deployments/chatty-cathy-deployment chatty-cathy=michaelkoconnor/chatty-cathy:latest