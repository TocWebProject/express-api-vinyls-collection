CREATE TABLE vinyl
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    artiste VARCHAR(100),
    album VARCHAR(100),
    label VARCHAR(255),
    date_de_sortie DATE
);

INSERT INTO vinyl
  (artiste, album, label, date_de_sortie)
VALUES
    ('Prince of denmark', 'V', 'Giegling', '2016-03-10'),
    ('Simo Cell', 'Club production', 'Temet', '2021-05-23'),
    ('Exal', 'Not to late', 'Faktice', '2022-03-13'),
    ('Low jack', 'Yeah yo', 'Gravat', '2019-09-17');
