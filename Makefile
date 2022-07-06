.PHONY: init
init:
	npm i

.PHONY: build
build:
	npm run prestart

.PHONY: run-project_auth
run-project_auth:
	npm run start-auth


.PHONY: run-project_app
run-project_app:
	npm run start-app

.PHONY: run-prod
run-prod:
	tsc && node ./dist/index.js

.PHONY: generate_app
generate_app:
	npm run typeorm migration:generate -- -d app/src/dataSource/data-source.ts app/src/migrations/migrations

.PHONY: migration_app
migration_app:
	npm run typeorm migration:run -- -d app/src/dataSource/data-source.ts

.PHONY: revert_app
revert_app:
	npm run typeorm migration:revert -d app/src/dataSource/data-source.ts


.PHONY: generate_auth
generate_auth:
	npm run typeorm migration:generate -- -d authentication/src/dataSource/data-source.ts authentication/src/migrations/migrations

.PHONY: migration_auth
migration_auth:
	npm run typeorm migration:run -- -d authentication/src/dataSource/data-source.ts

.PHONY: revert_auth
revert_auth:
	npm run typeorm migration:revert -d authentication/src/dataSource/data-source.ts

.DEFAULT_GOAL: init