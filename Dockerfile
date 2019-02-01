FROM node:10.13-alpine AS build
WORKDIR /srv
COPY package*.json ./
RUN npm install

FROM node:10.13-alpine
WORKDIR /usr/src/app
COPY --from=build /srv .
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["npm", "start"]


# SMALLER BUT LONGER BUILD BELOW

# FROM node:10.13-alpine AS build
# WORKDIR /src
# COPY package*.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# FROM node:10.13-alpine
# WORKDIR /usr/src/app
# COPY --from=build /src/package*.json ./
# COPY --from=build /src/db ./db
# COPY --from=build /src/server ./server
# COPY --from=build /src/tests ./tests
# COPY --from=build /src/dist ./dist
# RUN npm install --only=production
# EXPOSE 4000
# CMD ["npm", "start"]