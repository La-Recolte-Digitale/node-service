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
	# docker-compose -f docker-compose.yml run node-template run npm test:integration:run
	make runDockerCmd CMD="npm run test:integration:run"
		
tests_integration_watch:
	make runDockerCmd CMD="npm run test:integration:watch"

test_one:
	make runDockerCmd CMD="npx jest --detectOpenHandles --forceExit -- ${CMD} "

lint:
	make runDockerCmd CMD="npm run lint"

lint-fix:
	make runDockerCmd CMD="npm run lint:fix"

##########################################################
#######              Common CMD                    #######
##########################################################
runDockerCmd:
	docker exec -it ${service_name} bash -c "${CMD}"