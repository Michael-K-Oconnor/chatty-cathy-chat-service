build-run:
	docker-compose up --build chatty-cathy

build:
	docker-compose build chatty-cathy

run:
	docker-compose up chatty-cathy

test:
	docker-compose up --build test

travis-lint:
	travis lint ./.travis.yml

gpr:
	gpr

