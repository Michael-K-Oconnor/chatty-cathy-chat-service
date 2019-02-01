FROM node:10.13-alpine AS build
WORKDIR /src
ADD package.json .
RUN npm install && npm run build

FROM node:10.13-alpine
WORKDIR /usr/src/app
COPY --from=build /src .
ADD . .
EXPOSE 4000
CMD ["npm", "start"]




FROM node:10.13-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["npm", "start"]