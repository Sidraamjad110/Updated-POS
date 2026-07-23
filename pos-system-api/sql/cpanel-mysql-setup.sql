-- Optional: create DB + user in phpMyAdmin / MySQL (cPanel)
-- Run this in phpMyAdmin SQL tab if the DB/user do not exist yet.

CREATE DATABASE IF NOT EXISTS `pos` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER IF NOT EXISTS 'pos_user'@'localhost' IDENTIFIED BY 'uTbCZQqYyjd5';
CREATE USER IF NOT EXISTS 'pos_user'@'%' IDENTIFIED BY 'uTbCZQqYyjd5';

GRANT ALL PRIVILEGES ON `pos`.* TO 'pos_user'@'localhost';
GRANT ALL PRIVILEGES ON `pos`.* TO 'pos_user'@'%';
FLUSH PRIVILEGES;

-- Tables are created automatically by the Node app on first start (sequelize.sync).
