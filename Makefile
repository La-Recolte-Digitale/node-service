dc_service_name=node-template
service_name=node-template-service
database_name=node-template-db-test

run:
	docker-compose -f docker-compose.yml up

build:
	docker-compose -f docker-compose.yml build

stop:
	docker-compose -f docker-compose.yml down

logs:
	docker logs -f $(service_name)

database-logs:
	docker logs -f $(database_name)

##########################################################
#######              Common CMD                    #######
##########################################################
tests_integration:
	make runServiceCmd CMD="npm run test:integration:run"
	
tests_integration_watch:
	make runServiceCmd CMD="npm run test:integration:watch"

test_one:
	make runServiceCmd CMD="npx jest --detectOpenHandles --verbose false --forceExit -- ${FILE} "

lint:
	make runServiceCmd CMD="npm run lint"

lint-fix:
	make runServiceCmd CMD="npm run lint:fix"

##########################################################
#######              Common CMD                    #######
##########################################################
runServiceCmd:
	docker-compose -f docker-compose.yml run ${dc_service_name} ${CMD}
	docker-compose down
	docker volume prune --force
