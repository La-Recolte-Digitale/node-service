service_name=node-template-service
database_name=node-template-db-test

service-run:
	gnome-terminal \
		--title="Node_template Service Containers" \
		-- sh -c "CURRENT_UID=$$(id -u):$$(id -g) docker-compose -f docker-compose-dev.yml up; exec bash";

service-stop:
	CURRENT_UID=$$(id -u):$$(id -g) docker-compose -f docker-compose-dev.yml down

service-logs:
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