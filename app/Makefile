.PHONY: init
init:
	npm i

.PHONY: build
build:
	npm run prestart


.PHONY: run-project
run-project:
	npm run start

.PHONY: run-prod
run-prod:
	tsc && node ./dist/index.js

.PHONY: generate
generate:
	npm run typeorm migration:generate -- -d src/dataSource/data-source.ts src/migrations/migrations

.PHONY: migration
migration:
	npm run typeorm migration:run -- -d src/dataSource/data-source.ts

.PHONY: run-db
run-db:
	npm run typeorm migration:run -- -d src/dataSource/data-source.ts

.PHONY: revert
revert:
	npm run typeorm migration:revert -d src/dataSource/data-source.ts


.DEFAULT_GOAL: init