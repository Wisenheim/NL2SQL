export const SQL_SCHEMA = `
CREATE TABLE users(  
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE address (
    address_id   SERIAL PRIMARY KEY,
    street       VARCHAR(120) NOT NULL,
    city         VARCHAR(80)  NOT NULL,
    state        VARCHAR(80),
    postal_code  VARCHAR(20),
    country      VARCHAR(80)  NOT NULL
);
CREATE TABLE product (
    product_id   SERIAL PRIMARY KEY,
    name         VARCHAR(120) NOT NULL,
    description  TEXT,
    price        NUMERIC(10,2) NOT NULL CHECK (price >= 0),
    created_at   TIMESTAMPTZ   DEFAULT NOW()
);
`