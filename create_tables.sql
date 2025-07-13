CREATE TABLE users(  
    user_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(50) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- insert some users
INSERT INTO users (first_name, last_name, email)
VALUES
('abdelkader', 'yardi', 'abdelkader.yardi@mail.com'),
('Mike', 'johnson', 'mike.johnson@mail.com'),
('Jane', 'Smith', 'jane.smith@mail.com');




-- === Schema definition ===
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

-- === Seed data ===
INSERT INTO address (street, city, state, postal_code, country) VALUES
('221B Baker St',      'London',       NULL,          'NW1 6XE', 'United Kingdom'),
('1600 Amphitheatre',  'Mountain View','CA',          '94043',   'United States'),
('4 Privet Drive',     'Little Whinging','Surrey',    'CR3 0AA', 'United Kingdom'),
('1 Hacker Way',       'Menlo Park',   'CA',          '94025',   'United States'),
('Platz der Republik', 'Berlin',       NULL,          '11011',   'Germany');

INSERT INTO product (name, description, price) VALUES
('Acme Anvil',          'Heavy‑duty anvil for cartoon physics.',          199.99),
('Invisibility Cloak',  'Fabric that renders the wearer unseen.',         3499.95),
('Hoverboard',          'Self‑balancing personal transporter.',            899.00),
('Pocket Translator',   'Instant speech translation in 60 languages.',     129.50),
('Quantum Coffee',      'Beans roasted while entangled for perfect flavor.', 22.75);

select *
from address;


-- [optional]to be used to fetch meta to pass to the model

SELECT
tc.table_name,
tc.constraint_type,
kcu.COLUMN_NAME
from information_schema.table_constraints as tc
join information_schema.key_column_usage as kcu
on tc.constraint_name = kcu.constraint_name
WHERE tc.table_schema = 'public' -- adjust schema as necessary
and tc.constraint_type in ('PRIMARY KEY', 'FOREIGN KEY', 'UNIQUE')