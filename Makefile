run:
	docker-compose up -d --build

build:
	docker-compose build chatty-cathy

test:
	docker-compose up --build test

gpr:
	gpr