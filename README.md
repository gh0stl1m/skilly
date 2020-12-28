# Skilly App
The application creates short, shareable links in user content. Additionally skilly app collects basic engagement data about user clicks.

## Requirements
* Docker
* Docker Compose
* NodeJS v14.15.x
* MongoDB v4.x
* Yarn

## Local Setup
The application use a lerna monorepo which works with yarn workspaces, so if we wanna run the application the first thing that we should do is to install the repositories dependencies.
```
yarn install -W
```

Once we have installed all the dependencies we have two options to run the project.

### Run Services Manually
#### Skilly API
To run the API we will need to be sure that the MongoDB is up and running, in case to do not have a MongoDB installation you could run the following commands
```
docker pull mongo
docker run -itd -v <local-directory>:/data/db -e MONGO_INITDB_ROOT_USERNAME=<admin-user> -e MONGO_INITDB_ROOT_PASSWORD= <admin-pwd> -p 27017:27017 --name=mongoDB mongo
```

When the container is up and running we can be able to create the user that gonna be used by the API running the following comands
```
docker ps # Identify and copy the ID of the container that is running the MongoDB.
docker exec -it <container_id> mongo

# Login with admin user
use admin;
db.auth('<admin-ser>', '<admin-pwd>');

# Create user to the application DB
use skillydb;
db.createUser({ user: '<db-user>', pwd: '<db-pwd>', roles: [{ role: 'readWrite', db: 'skillydb' }]});

# Once the user has been created, we will be able to test it out
db.auth('<db-user>', 'db-pwd');

# The ouput of the command should be 1, which means that the user has been authenticated successfully.
```

The API application requires a `.env` file which should be created in the root of the project with the following env variables:
```
MONGODB_URI=mongodb://localhost:27017/skillydb
MONGODB_DATABASE=skillydb
MONGODB_USER=<db-user>
MONGODB_PASS=<db-password>
MONGODB_ADMIN_USER=<admin-user>
MONGODB_ADMIN_PASS=<admin-pwd>
API_SERVER_PORT=8081
WEB_SERVER_PORT=3000
```

To run the API application we should execute the following command
```
yarn start:server
```

#### Skilly Web UI
First of all we need to be sure that the API is up and running and then we should be able to run the UI with the following command.
```
yarn start:web
```

### Run Services with docker compose
The application has a `docker-compose` file in the root folder that allow us to set up the environment easily.
First of all we will need to have the `.env` file created with the same env variables described in the manual configuration step of the Skilly API.

Once we have configured the `.env` file we could be able to build the application.
```
docker-compose build --no-cache
```

To run the application.
```
docker-compose --env-file .env up
```

> **Disclaimer:** In the first execution the `api-gw` application could fail because the database has not configured the user that gonna be used by the application. To fix this issue you could open another terminal without killing the `docker-compose up` command process and execute the same commands described in the manual setup of the Skilly API. When the user is already created, you could kill the process where the `docker-compose up` command is running and then re execute again the command `docker-compose up --env-file .env up` and the backend should connect successfully with the database.
