service_name=node-template-service
database_name=node-template-db-test

run:
	gnome-terminal \
		--title="${service_name} Containers" \
		-- sh -c "docker-compose -f docker-compose.yml up; exec bash";

build:
	gnome-terminal \
		--title="${service_name} Containers" \
		-- sh -c "docker-compose -f docker-compose.yml build; exec bash";

stop:
	docker-compose -f docker-compose.yml down

logs:
	gnome-terminal \
	--title="Logs_$(service_name)" \
	-- sh -c "docker logs -f $(service_name); exec bash";

database-logs:
	gnome-terminal \
	--title="Logs_$(database_name)" \
	-- sh -c "docker logs -f $(database_name); exec bash";

##########################################################
#######              Common CMD                    #######
##########################################################
tests_integration:
	make runDockerCmd CMD="npm run test:integration:run"

tests_integration_new_terminal:
	gnome-terminal \
		--title="${service_name} - Integration Tests" \
		-- sh -c 'make tests_integration; exec bash';
		
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
#Run a command into the dataviz service docker (npm, npx, ...)
runDockerCmd:
	docker exec -it ${service_name} bash -c "${CMD}"