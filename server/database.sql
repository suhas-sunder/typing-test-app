CREATE DATABASE typingtestapp;

--set extension
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

--insert dummy users
INSERT INTO users(user_name, user_email, user_password) VALUES ('Tom', 'tom123@gmail.com', 'randpass');