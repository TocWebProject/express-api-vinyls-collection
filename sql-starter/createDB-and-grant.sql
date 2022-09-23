/*
*   Setup local  - A adapter en production pour plus de sécurité
*/

CREATE DATABASE IF NOT EXISTS `nodeapi-vinyls-collection`
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;

GRANT USAGE ON *.* TO "nodeapiuser"@"localhost" IDENTIFIED BY "123456789" 
  WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;

GRANT USAGE ON *.* TO "nodeapiuser"@"%" IDENTIFIED BY "123456789"
  WITH MAX_QUERIES_PER_HOUR 0 MAX_CONNECTIONS_PER_HOUR 0 MAX_UPDATES_PER_HOUR 0 MAX_USER_CONNECTIONS 0;

GRANT ALL PRIVILEGES ON `nodeapi-vinyls-collection`.* TO 'nodeapiuser'@'%';
GRANT ALL PRIVILEGES ON `nodeapi-vinyls-collection`.* TO 'nodeapiuser'@'localhost';
