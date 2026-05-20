.PHONY: install dev build test lint format docker-build docker-run

install:
	npm install

dev:
	npm start

build:
	npm run build

test:
	npm test

lint:
	npm run lint

format:
	npx prettier --write .

docker-build:
	docker build -t mobile-store .

docker-run:
	docker run -p 8080:80 mobile-store
