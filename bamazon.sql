-- item_id (unique id for each product)
-- product_name (Name of product)
-- department_name
-- price (cost to customer)
-- stock_quantity (how much of the product is available in stores)

DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price INT,
  stock_quantity INT,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Half-eaten Burrito", "Food", 1.99, 7);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Telular Celephone", "Electronics", 75.00, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Rug that ties the room together", "Home Decor", 15.00, 3);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Szechuan Sauce", "Food", 49.99, 35);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Leaky Water Bottle", "Kitchen", 2.50, 81);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stinky Fish", "Food", 1.50, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Snail", "Pets", 12.50, 14);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Grape", "Food", 00.45, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Penguin Pendant", "Jewelry", 29.99, 42);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pickle Juice", "Food", 2.99, 37);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bed Bug Infestation", "Pranks", 75.00, 18);