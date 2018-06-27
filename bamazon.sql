DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon

USE bamazon;

CREATE TABLE Products(
    item_id INT AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(50) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INT(10) NOT NULL,
    primary key(item_id)
);

SELECT * FROM Products;

INSERT INTO Products(product_name,department_name,price,stock_quantity)
VALUES ("Levi's Jeans","Clothing",65.25,100),
        ("Sky Diving","Entertainment",29.99,23),
        ("Spam","Grocery",3.23,50),
        ("Coconut Chips","Grocery",5.99,200),
        ("Jcrew shirts","CLOTHING",39.55,35),
        ("Water Park","Entertainment",99.00,42),
        ("Cigar","Grocery",78.99,25),
        ("Rudy's BBQ","Restaurant",28.66,120),
        ("Urban Outfitters","Clothing",55.99,60),
        ("Zipline","ENTERTAINMENT",49.11,99);

SELECT * FROM Products;

