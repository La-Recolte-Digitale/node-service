dc_service_name=node-template
service_name=node-template-service
database_name=node-template-db-test

##########################################################
#######                SERVICE                     #######
##########################################################
service-run:
	docker-compose -f docker-compose.yml up

service-build:
	docker-compose -f docker-compose.yml build

service-stop:
	docker-compose -f docker-compose.yml down

service-logs:
	docker logs -f $(service_name)

service-tests:
	-docker-compose -f docker-compose.yml run ${dc_service_name} npm run test
	make service-stop

service-test-one:
	-docker-compose -f docker-compose.yml run ${dc_service_name} npx jest --detectOpenHandles --runInBand --verbose false --forceExit -- ${CMD}
	make worker-stop

service-lint:
	-docker-compose -f docker-compose.yml run ${dc_service_name} npx eslint ./src ./test
	make service-stop

service-lint-fix:
	-docker-compose -f docker-compose.yml run ${dc_service_name} npx eslint --fix ./src ./test
	make service-stop


service-security:
	-docker-compose -f docker-compose.yml run ${dc_service_name} npm audit
	make service-stop
##########################################################
#######                   DB                       #######
##########################################################
database-logs:
	gnome-terminal \
	--title="Logs_$(database_name)" \
	-- sh -c "docker logs -f $(database_name); exec bash";

##########################################################
#######                UTILS                       #######
##########################################################
package-alias-update:
	node updateAlias.js
