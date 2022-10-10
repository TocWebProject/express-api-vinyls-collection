CREATE TABLE users
(
    id_user INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    secret_password VARCHAR(255) NOT NULL,
    registered DATE NOT NULL,
    last_login DATE 
);

CREATE TABLE vinyl
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    fk_id_user INT NOT NULL,
    FOREIGN KEY (fk_id_user) REFERENCES users (id_user) ON DELETE CASCADE,
    artist VARCHAR(100),
    album VARCHAR(100),
    label VARCHAR(255),
    release_date DATE
);

INSERT INTO users
  (username, secret_password, registered, last_login)
VALUES
    ('TheUser', '$2y$10$NUQmwwEIWOdMoxYlM4jUGOVzP8Oze6HB2wVtp7arwna4Ae5nPzTla','2022-10-29', '2022-10-29');

INSERT INTO vinyl
  (artist, album, label, release_date, FK_id_user)
VALUES
    ('Prince of denmark', 'V', 'Giegling', '2016-03-10', '1'),
    ('Simo Cell', 'Club production', 'Temet', '2021-05-23', '1'),
    ('Exal', 'Not to late', 'Faktice', '2022-03-13','1'),
    ('Low jack', 'Yeah yo', 'Gravat', '2019-09-17', '1');



