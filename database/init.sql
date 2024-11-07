
-- tabela certa

CREATE EXTENSION IF NOT EXISTS citext;

CREATE TABLE IF NOT EXISTS Categories (
code SERIAL PRIMARY KEY,
name citext UNIQUE,
TAX NUMERIC (10,2)
);

CREATE TABLE IF NOT EXISTS products (
code SERIAL PRIMARY KEY,
name citext UNIQUE,
price NUMERIC(10,2),
amount INTEGER,
categorychose INTEGER,
CONSTRAINT FK_category FOREIGN KEY (categorychose) REFERENCES Categories(code)
);

CREATE TABLE IF NOT EXISTS history(
code SERIAL PRIMARY KEY,
totalvalue NUMERIC(10,2),
totaltax NUMERIC(10,2)
);

CREATE TABLE IF NOT EXISTS home (
code SERIAL PRIMARY KEY,
name INTEGER,
price NUMERIC(10,2),
amount INTEGER,
tax NUMERIC(10,2),
status BOOLEAN,
cod_order INTEGER,
CONSTRAINT FK_history FOREIGN KEY (cod_order) REFERENCES history(code),
CONSTRAINT FK_home FOREIGN KEY (name) REFERENCES products(code)
);


