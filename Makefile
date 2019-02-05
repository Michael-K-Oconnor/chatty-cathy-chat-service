run:
	docker-compose up -d --build

build:
	docker-compose build chatty-cathy

test:
	docker-compose up --build test

travis-lint:
	travis lint ./.travis.yml

gpr:
	gpr

