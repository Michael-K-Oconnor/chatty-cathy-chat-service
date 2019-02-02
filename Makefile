run:
	docker-compose up -d --build

build:
	docker-compose build chatty-cathy

test:
	docker-compose up --build test

pr:
	hub pull-request -m "$(git log -1 --pretty=%B)"