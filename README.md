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

#### Ensemble de la collection d'un user - Method GET avec l'id de l'user
http://localhost:3000/vinyl/{id}

#### Ajouter un vinyl d'un user - Method POST avec body params
http://localhost:3000/vinyl/create/

#### Update d'un vinyl d'un user - Method PUT avec body params et id du vinyl dans le path
http://localhost:3000/vinyl/put/{id}

#### Suppresion d'un vinyl d'un user - Method DELETE avec body params  et avec id du vinyl dans le path dans le path
http://localhost:3000/vinyl/delete/{id}


## Depedencies

#### express.js
#### mysl
#### nodemon
#### helmet 
#### dotenv
#### swagger-ui-express