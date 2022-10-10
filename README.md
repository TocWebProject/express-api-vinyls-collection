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


## Documentation détaillé de l'api via Swagger avec description des paramètres pour chaque route
http://localhost:3000/api-docs/


## Routes Vinyles

#### Ensemble de la collection d'un user - Method GET 
http://localhost:3000/vinyl/{id}

#### Ajouter un vinyl d'un user - Method POST 
http://localhost:3000/vinyl/create/

#### Update d'un vinyl d'un user - Method PUT 
http://localhost:3000/vinyl/put/{id}

#### Suppresion d'un vinyl d'un user - Method DELETE 
http://localhost:3000/vinyl/delete/{id}

## Routes Login / Register

#### Enregistrement d'un utilisateur - Method POST 
http://localhost:3000/sign-up 

#### Connexion d'un utilisateur - Method POST 
http://localhost:3000/login





## Depedencies

#### express.js
#### mysl
#### nodemon
#### helmet 
#### dotenv
#### swagger-ui-express
#### jsonwebtoken
#### bcryptjs