## Description

In this project I developed an API for a CRUD blog posts (with Sequelize),
endpoints (following REST principles) that are connected to the database,
the architecture pattern used was MSC.

## After downloading the project:
create an .env file to connect to your local database:
```
MYSQL_USER=yourUser
MYSQL_PASSWORD=yourPass
HOSTNAME=yourHost
JWT_SECRET=yourSecretPass
```

Then:

```
npm i
npm run prestart
npm run seed
npm start
```
