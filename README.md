# ChattyCathy Chat Service

A Node.js service to provide users with chatroom and chat message data for ChattyCathy, a full stack chat application

## Motivation

ChattyCathy is a full stack web application that serves as a sandbox for personal exploration of different software development techniques and practices. This application has a microservice architecture with seperate services to serve React.js client-side code and Node.js backend services handling API requests with an NGINX reverse-proxy routing incoming requests.

## Installation and Setup

There are several ways to run this service.

1. Download it from the Docker image michaelkoconnor/chatty-cathy-chat-service hosted on DockerHub [here](https://cloud.docker.com/u/michaelkoconnor/repository/docker/michaelkoconnor/chatty-cathy-chat-service) 

2. Clone this repository and build the Docker image locally using the included Dockerfile

3. Clone the [chatty-cathy-main repository](https://github.com/Michael-K-Oconnor/chatty-cathy-main.git) and run the following command to initialize all containers required to run the ChattyCathy app locally. Note that several of the containers included in the docker-compose file require .env files which are not currently publically available

```bash
docker-compose up
```

## Built With

- Node.js
- Postgres
- Redis
- Knex
- Docker

## Related

[chatty-cathy-main](https://github.com/Michael-K-Oconnor/chatty-cathy-main.git)
- Contains docker-compose file used to initalize all containers of the ChattyCathy app locally

[chatty-cathy-reverse-proxy](https://github.com/Michael-K-Oconnor/chatty-cathy-reverse-proxy.git)
- Contains NGINX reverse-proxy which routes all request for ChattyCathy app either to either service which serves client-side code or to appropriate backend service

[chatty-cathy-frontend](https://github.com/Michael-K-Oconnor/chatty-cathy-frontend.git)
- Contains NGINX proxy which servers the client-side code for the ChattyCathy app. The client is written using React.js and bundled using Webpack

[chatty-cathy-chat-service](https://github.com/Michael-K-Oconnor/chatty-cathy-chat-service.git)
- Contains projects service for the ChattyCathy app, which consists of a Node.js webserver that connects to a Postgres database and implements a Pub/Sub pattern using Redis
