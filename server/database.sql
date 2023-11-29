CREATE DATABASE typingtestapp;

--set extension
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  user_date_time DATE NOT NULL
);

--insert dummy users
INSERT INTO users(user_name, user_email, user_password) VALUES ('Tom', 'test@gmail.com', 'randpass1@');


CREATE TABLE testSettings(
  testSettings_id SERIAL PRIMARY KEY,
  user_id SERIAL NOT NULL,
  name VARCHAR(255) NOT NULL,
  settings text[] NOT NULL,
  selected BOOLEAN NOT NULL,
  isDefault BOOLEAN NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO testSettings(name, settings, selected, isDefault) VALUES ('Very Easy', ARRAY ['all lower case', 'no punctuation'], false, true );
INSERT INTO testSettings(name, settings, selected, isDefault) VALUES ('easy', ARRAY ['all lower case', 'Digits 0 - 9'], false, true );
INSERT INTO testSettings(name, settings, selected, isDefault) VALUES ('medium', ARRAY [''], true, true );
INSERT INTO testSettings(name, settings, selected, isDefault) VALUES ('Very Hard', ARRAY ['PascalCase', 'camelCase', 'complex words', 'MiXeDcAsE'], false, true );


CREATE TABLE tests(
  test_id SERIAL PRIMARY KEY,
  user_id SERIAL,
  test_name VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
