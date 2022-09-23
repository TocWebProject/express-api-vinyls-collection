# API Collection de Vinyles avec Express.js & MySql - Documentation avec Swagger

## Installation

### Database

Création de la base et privilège utilisateur 
```bash
mysql> source /express-api-vinyl-collection/sql-starter/createDB-and-grant.sql
```

Création des tables et un basique seeders
```bash
mysql> source /express-api-vinyl-collection/sql-starter/createTable-and-populate.sql
```


### Env

Configurer le ficher .env.example avec les informations contenues dans le fichier /sql-starter/createDB-and-grant.sql et renommer .env.example en .env
 

### Api

```bash
cd express-api-vinyl-collection
npm install
npm run start
```


## Swagger Documentation 
http://localhost:3000/api-docs/


## Routes CRUD Methods  

#### Ensemble de la collection - Method GET 
http://localhost:3000/vinyls/

#### Créer un vinyl - Method POST avec body params
http://localhost:3000/vinyls/create/

#### Créer un vinyl - Method PUT avec body params et id dans le path
http://localhost:3000/vinyls/create/

#### Suppresion d'un vinyl de la collection - Method DELETE avec id dans le path
http://localhost:3000/vinyls/delete/id


## Depedencies

#### express.js
#### mysl
#### nodemon
#### helmet 
#### dotenv
#### swagger-ui-express