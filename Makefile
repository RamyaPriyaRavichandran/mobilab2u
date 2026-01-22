server-up:
	docker-compose -f ./docker-compose-server.yml up --build -d
server-down:
	docker-compose -f ./docker-compose-server.yml down
ui-up:
	docker-compose -f ./docker-compose-ui.yml up --build -d
ui-down:
	docker-compose -f ./docker-compose-ui.yml down