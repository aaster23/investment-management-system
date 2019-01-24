![N|Solid](https://raw.githubusercontent.com/Telerik-final-project/Project-Company-Life/master/specification/assets/telerik-logo.png)
# Trading 11     
![N|Solid](http://www.duckhousecorbridge.co.uk/wp-content/uploads/2016/02/Duck-Favicon.png) 

# General Description
Trading 11 is an investment management system platform. Our users are people who manage a set of client's portfolios, buy or sell stocks on his/her behalf in real time stock prices.
It is a single page application done as final project for Telerik Academy Alpha JS course. 

##### Home Page
It is a page where user can only to login. Users with admin and manager permission can access only.
`Admin` is the user who can register new managers, admins, and clients (they cannot login), assign clients to managers, delete profiles.
`Manager` is the user who can buy or sell stocks for clients, can see their portfolios.
`Clients` are these for whom we gave our health, nerves, time...and get their money :)

*General Overview* is main page where manager can operate and doing his job, as well as he/she/it can.
*Client Overview* is main page for the client, but only manager can see it, portfolio, balance, open positions etc.
*Admin Overview* is main page for the admin, where he can give and take many lives in this system

# Prerequisites
Trading 11 requires Node.js enviroment and MariaDB relational database. MySQL is not required, but will make your experince 'frienly', when using databases.
* [Node.js](https://nodejs.org/) 
* [MariaDB](https://downloads.mariadb.org/)
* [MySQL Workbench](https://www.mysql.com/products/workbench/) 

# Installing

After you clone successfully this repository:
#### Server
 - navigate to `server` folder, after that run `npm install`, to install all packages from `package.json` file.
```sh
$ npm install
```
 - create in MySQL Workcbench **database**. In `ormconfig.json` and `ormconfig.js` default name is *testdb*, rename it if you want, but it has to be the same in MySQL. See also password and port!
 - next step is `generate migration`, to create tables and their relations in database. *Initial is just a message*.
 ```sh
$ npm run migration:run -- --name=Initial
```
  - if the migration is successfull (see *server/src/data/migrations*), apply it to database.
  - if migration fail, delete all generated migratons in this file and run it again)
 ```sh
$ npm run migration:run
```
 - due to the fact that in our platform only user with **admin** permissions can register other users, set admin and some additional data, for credentials check *server/src/setup/seed-data.ts*
 ```sh
$ npm run setup
```
 - for fake prices run:
  ```sh
$ npm run update
```
 - create `.env` file at root level which include sensitive information for your server:
  ```sh
DB_DATABASE_NAME='your Database Name'
JWT_SECRET='password For Generate JWTokens'
```
 - to run the server use:
  ```sh
$ npm run start
```
 - or in development mode use:
  ```sh
$ npm run start:dev
```

#### Client
- navigate to `client` folder, after that run `npm install`, to install all packages from `package.json` file.
```sh
$ npm install
```
 - to run application in development mode use:
 ```sh
$ ng serve
```
# Architecture
 - This following section describes an architecture that is used through the development process.
 - (MongoDB <=> MariaDB; Express<=>Nest.js)
![N|Solid](https://raw.githubusercontent.com/Telerik-final-project/Project-Company-Life/master/specification/assets/example-architecture.png)
# Run test
For testing purposes we use [Jest](https://jestjs.io/) and [Jasmine](https://jasmine.github.io/)
#### Server
 - in server folder you can run tests with
 ```sh
$ npm test
```

 - in client folder you can run tests with
 ```sh
$ npm run test
```
*For e2e tests, coverage etc. check **package.json** `scripts` in client and server folders.*
# Build With
Trading 11 uses a number of open source projects to work properly:
 - [Angular](https://angular.io/) - framework user
 - [NestJS](https://nestjs.com/) - framework for building our server-side in [Node.js](https://nodejs.org/en/)
 - [Jest](https://jestjs.io/) - for testing our backend
 - [Jasmine](https://jasmine.github.io/) - for testing our frontend 
 - [Angular Material](https://material.angular.io/) - for design components in Angular
 - [ag-Grid](https://www.ag-grid.com/) - for efficient searching and filtering information
 - [MariaDB](https://mariadb.org/)
 - [TypeORM](http://typeorm.io/#/)
 - [JWT](https://jwt.io/) - for authentication and authorization
# Authors
 - [Georgi Yordanov](https://github.com/aaster23)
 - [Martin Bechev](https://github.com/mbechev)
# Acknowledgments
Telerik Academy tech trainers:
 - [Martin Veshev](https://github.com/vesheff)
 - [Rosen Urkov](https://github.com/RosenUrkov)
 - [Steven Tsvetkov](https://github.com/StevenTsvetkov)
 
 Telerik Academy soft skills trainers:
 - Nadezhda Marinova
 - Petya Grozdarska
 - Emanuela Kozhushkova
 
Our mentors:
- [Alexander Targov](https://github.com/freeride8)
- all colegues and friends, due to the course :)
