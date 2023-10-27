-- Active: 1692155575836@@127.0.0.1@5432@inventory@public

CREATE TABLE
    Admins(
        id SERIAL NOT NULL PRIMARY KEY,
        admin_id VARCHAR(11) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Tokens(
        id SERIAL NOT NULL,
        admin_id int REFERENCES ADMINS(id) ON DELETE CASCADE,
        token VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Products(
        id SERIAL NOT NULL PRIMARY KEY,
        product_name VARCHAR(50) UNIQUE NOT NULL,
        product_price INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Parties(
        id SERIAL NOT NULL PRIMARY KEY,
        party_type VARCHAR(6) NOT NULL,
        party_name VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Inventory(
        id SERIAL NOT NULL PRIMARY KEY,
        product_id INT REFERENCES Products(id) ON DELETE CASCADE,
        stock BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Transactions(
        id SERIAL PRIMARY KEY NOT NULL,
        party_id INT REFERENCES Parties(id) ON DELETE CASCADE,
        transaction_type VARCHAR(7) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

CREATE TABLE
    Transaction_Products(
        id SERIAL NOT NULL,
        transaction_id INT REFERENCES Transactions(id) ON DELETE CASCADE,
        product_id INT REFERENCES Products(id) ON DELETE CASCADE,
        quantity BIGINT NOT NULL,
        price BIGINT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

INSERT into
    admins(admin_id, password)
VALUES (
        123,
        '21232f297a57a5a743894a0e4a801fc3'
    );

ALTER TABLE Inventory
ADD
    CONSTRAINT unique_product_id UNIQUE (product_id);

ALTER TABLE products
ADD
    COLUMN product_category VARCHAR(50) NOT NULL;