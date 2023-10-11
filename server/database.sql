CREATE DATABASE typingtestapp;

--set extension
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(255),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  user_date DATE NOT NULL
);

--insert dummy users
INSERT INTO users(user_name, user_email, user_password) VALUES ('Tom', 'tom123@gmail.com', 'randpass');

CREATE TABLE tests(
  test_id SERIAL PRIMARY KEY,
  user_id SERIAL,
  test_name VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

  