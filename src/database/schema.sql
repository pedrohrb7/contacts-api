CREATE DATABASE contactsAPI;

CREATE TABLE categories (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL
);

CREATE TABLE IF NOT EXISTS contacts (
    id UUID NOT NULL UNIQUE DEFAULT uuid_generate_v4(),
    name VARCHAR NOT NULL,
    email VARCHAR UNIQUE,
    phone VARCHAR,
    category_id UUID,
    FOREIGN KEY(category_id) REFERENCES categories(id)
);

CREATE EXTENSION "uuid-ossp";