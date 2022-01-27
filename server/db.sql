CREATE TABLE games
(
  game_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_name VARCHAR(255) NOT NULL,
  add_date TIMESTAMP NOT NULL,
  release_date TIMESTAMP NOT NULL,
  description TEXT NOT NULL,
  genre VARCHAR(255) NOT NULL,
  picture TEXT NOT NULL,
  price DECIMAL(20,2) NOT NULL,
  price_history FLOAT[] NOT NULL,
  developer TEXT NOT NULL,
  discount FLOAT default 0,
  media TEXT[] default NULL

);
CREATE TABLE users
(
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  email_address VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  balance DECIMAL(20,2) DEFAULT 0
);
CREATE TABLE gkey
(
  gkey_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  game_id uuid REFERENCES games(game_id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(user_id) ON DELETE CASCADE,
  gkey_value VARCHAR(255) NOT NULL,
  status BOOLEAN default false
);
CREATE TABLE profile
(
  profile_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(user_id),
  name VARCHAR(255) DEFAULT '',
  second_name VARCHAR(255) DEFAULT '',
  avatar_url TEXT DEFAULT '',
  birthday TIMESTAMP 
);