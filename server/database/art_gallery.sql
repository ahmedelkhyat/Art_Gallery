CREATE DATABASE IF NOT EXISTS art_gallery;
USE art_gallery;

CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    gender ENUM('Male', 'Female') NOT NULL,
    is_admin BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS refresh_tokens (
    token_id INT AUTO_INCREMENT PRIMARY KEY,
    token TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
    stock INT DEFAULT 1 CHECK (stock >= 0),
    image VARCHAR(255) NOT NULL,
    category_id INT NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    total_amount DECIMAL(10, 2) NOT NULL CHECK (total_amount >= 0),
    status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
	order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT DEFAULT 1 CHECK (quantity > 0),
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS cart (
    cart_id INT AUTO_INCREMENT PRIMARY KEY,
    quantity INT DEFAULT 1 CHECK (quantity > 0),
    user_id INT NOT NULL,
    product_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS reviews (
    review_id INT AUTO_INCREMENT PRIMARY KEY,
    rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT NOT NULL,
    review_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    product_id INT NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (product_id) REFERENCES products(product_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

INSERT INTO users (name, email, password, address, phone_number, gender, is_admin) VALUES
('Admin', 'admin@gmail.com', '$2b$10$Kbo/feajTT2heBjuOpbgK.UuviMpXFNWmDuy8j.3ZawGqGDZvcKii', '10 Tahrir Square, Cairo, Egypt', '+201002345678', 'Male', TRUE),
('Ahmed Elkhyat', 'ahmed@gmail.com', '$2b$10$76ASZgK3gwOEPDZjSr4tL.X4p7gLX6Nlbm7BEcmEF4A7qq.x/jTBm', '24 Abbas El Akkad, Cairo, Egypt', '+201112345678', 'Male', FALSE),
('Laila Ashraf', 'laila@gmail.com', '$2b$10$NqfTxUPd8CaFs3zNV2iZgeJG6A7NdV.joLRXoyhKGNe4rzZOZc3ae', '102 Rehab City, Cairo, Egypt', '+201223456789', 'Female', FALSE),
('Ahmed Morshedy', 'morshedy@gmail.com', '$2b$10$hSl6riTP4lJeZ4JHoIknbuHZE7kFQhAvj0JC7CgyeBlc83yolBpku', '15 El-Salam Street, Cairo, Egypt', '+201334567890', 'Male', FALSE),
('Mustafa Hussein', 'mustafa@gmail.com', '$2b$10$sIfmzkGf1vK6yyjEKpeMC.FINIpsyDH3WVZj7yz/.IWzQHnFBLP/W', '5 El-Ghazali Street, Cairo, Egypt', '+201445678901', 'Male', FALSE);

INSERT INTO categories (category_name) VALUES
('Painting'),
('Sculpture'),
('Photography'),
('Digital Art');

INSERT INTO products (title, description, price, stock, image, category_id) VALUES
('Sunset Landscape', 'A beautiful sunset over a landscape.', 150.00, 10, '1729438832793-794590982.jpg', 1),
('Abstract Sculpture', 'A modern abstract sculpture.', 300.00, 5, '1729438940702-911580209.jpg', 2),
('Black and White Photography', 'A striking black and white photo.', 80.00, 20, '1729439074977-279571223.jpg', 3),
('Digital Cityscape', 'A vibrant digital artwork of a cityscape.', 200.00, 15, '1729439147727-959547562.jpg', 4);

INSERT INTO orders (total_amount, status, user_id) VALUES
(380.00, 'Pending', 2),
(300.00, 'Pending', 3),
(450.00, 'Pending', 4),
(120.00, 'Pending', 5);

INSERT INTO order_items (quantity, order_id, product_id) VALUES
(2, 1, 1),
(1, 1, 3),
(1, 2, 2),
(1, 2, 4),
(1, 3, 1),
(1, 4, 3);

INSERT INTO cart (quantity, user_id, product_id) VALUES
(1, 2, 2),
(1, 3, 1),
(1, 4, 4),
(1, 5, 1);

INSERT INTO reviews (rating, comment, product_id, user_id) VALUES
(5, 'Absolutely stunning! The colors are vibrant and mesmerizing.', 1, 2),
(4, 'Great sculpture, but a bit smaller than expected.', 2, 3),
(5, 'This piece is breathtaking! Highly recommend.', 1, 4),
(3, 'Nice artwork, but the shipping took too long.', 4, 5);

SELECT * FROM users;
SELECT * FROM refresh_tokens;
SELECT * FROM categories;
SELECT * FROM products;
SELECT * FROM orders;
SELECT * FROM order_items;
SELECT * FROM cart;
SELECT * FROM reviews;
