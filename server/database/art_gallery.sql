CREATE DATABASE art_gallery;
USE art_gallery;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE Categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

CREATE TABLE Products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    category_id INT,
    image_url VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'Pending',
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Order_Items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES Orders(order_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (product_id) REFERENCES Products(product_id)
);

CREATE TABLE Customer_Address (
    address_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    street VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(100),
    zip_code VARCHAR(20),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

INSERT INTO Users (name, email, password, is_admin) VALUES
('Ahmed Elkhyat', 'ahmed@gmail.com', 'ahmed12345', FALSE),
('Laila Ashraf', 'laila@gmail.com', 'laila12345', FALSE);

INSERT INTO Categories (category_name) VALUES
('Painting'),
('Sculpture'),
('Photography');

INSERT INTO Products (title, description, price, stock, category_id, image_url) VALUES
('Sunset Landscape', 'A beautiful sunset over a landscape.', 150.00, 10, 1, 'https://example.com/sunset-landscape.jpg'),
('Abstract Sculpture', 'A modern abstract sculpture.', 300.00, 5, 2, 'https://example.com/abstract-sculpture.jpg'),
('Black and White Photography', 'A striking black and white photo.', 80.00, 20, 3, 'https://example.com/bnw-photography.jpg');

INSERT INTO Orders (user_id, order_date, status) VALUES
(1, NOW(), 'Pending'),
(2, NOW(), 'Pending');

INSERT INTO Order_Items (order_id, product_id, quantity) VALUES
(1, 1, 1),
(1, 3, 2),
(2, 2, 1);

INSERT INTO Cart (user_id, product_id, quantity) VALUES
(1, 2, 1),
(2, 1, 1),
(2, 3, 2);

INSERT INTO Customer_Address (user_id, street, city, state, zip_code) VALUES
(1, '123 Elm St', 'New York', 'NY', '10001'),
(2, '456 Maple Ave', 'Los Angeles', 'CA', '90001');

SELECT * FROM Users;
SELECT * FROM Categories;
SELECT * FROM Products;
SELECT * FROM Orders;
SELECT * FROM Order_Items;
SELECT * FROM Cart;
SELECT * FROM Customer_Address;
