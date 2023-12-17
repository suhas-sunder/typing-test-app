CREATE DATABASE typingtestapp;

--set extension
CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  first_name VARCHAR(255),
  last_name VARCHAR(50),
  user_name VARCHAR(20) NOT NULL,
  user_email VARCHAR(255) NOT NULL UNIQUE,
  user_password VARCHAR(255) NOT NULL,
  user_date_time DATE NOT NULL
);

--insert dummy users
INSERT INTO users(user_name, user_email, user_password) VALUES ('Tom', 'test@gmail.com', 'randpass1@');

-- Score bonus stored here is purely based on the difficulty of the test score. Additional bonus will be added for duration, etc. 
CREATE TABLE testSettings(
  testSettings_id SERIAL PRIMARY KEY,
  user_id SERIAL NOT NULL,
  name VARCHAR(30) NOT NULL,
  settings text[] NOT NULL,
  difficulty_level VARCHAR(20),
  selected BOOLEAN NOT NULL,
  is_default BOOLEAN NOT NULL,
  scoreBonus SMALLINT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

INSERT INTO testSettings(name, settings, selected, isDefault) VALUES ('Very Easy', ARRAY ['all lower case', 'no punctuation'], false, true );
INSERT INTO testSettings(name, settings, selected, isDefault) VALUES ('easy', ARRAY ['all lower case', 'Digits 0 - 9'], false, true );
INSERT INTO testSettings(name, settings, selected, isDefault) VALUES ('medium', ARRAY [''], true, true );
INSERT INTO testSettings(name, settings, selected, isDefault) VALUES ('Very Hard', ARRAY ['PascalCase', 'camelCase', 'complex words', 'MiXeDcAsE'], false, true );




CREATE TABLE score(
  score_id SERIAL PRIMARY KEY,
  user_id SERIAL NOT NULL,
  difficulty_level VARCHAR(20),
  test_name VARCHAR(20) NOT NULL,
  total_chars SMALLINT NOT NULL,
  correct_chars SMALLINT NOT NULL,
  misspelled_chars SMALLINT NOT NULL,
  cpm SMALLINT NOT NULL,
  wpm SMALLINT NOT NULL,
  performance_score SMALLINT NOT NULL,
  test_score SMALLINT NOT NULL,
  test_accuracy SMALLINT NOT NULL,
  test_time_sec SMALLINT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  screen_size_info VARCHAR(50),
  difficulty_name VARCHAR(30),
  difficulty_settings VARCHAR[],
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

