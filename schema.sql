CREATE DATABASE IF NOT EXISTS `aadagam_db`;
USE `aadagam_db`;

-- 1. am_register
CREATE TABLE IF NOT EXISTS `am_register` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `shop_name` VARCHAR(255) NOT NULL,
  `owner_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `password` VARCHAR(255) DEFAULT NULL,
  `city` VARCHAR(255) NOT NULL,
  `subdomain` VARCHAR(255) NOT NULL,
  `status` TINYINT DEFAULT 1 COMMENT '1 = Active, 0 = Inactive / Suspended',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. am_asked_questions
CREATE TABLE IF NOT EXISTS `am_asked_questions` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `subdomain` VARCHAR(255) NOT NULL,
  `customer_name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL,
  `query` TEXT NOT NULL,
  `status` TINYINT DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. am_videos
CREATE TABLE IF NOT EXISTS `am_videos` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `subdomain` VARCHAR(255) NOT NULL,
  `video_url` VARCHAR(500) NOT NULL,
  `status` TINYINT DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. am_gallery_categories
CREATE TABLE IF NOT EXISTS `am_gallery_categories` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `subdomain` VARCHAR(255) NOT NULL,
  `category_name` VARCHAR(255) NOT NULL,
  `status` TINYINT DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. am_gallery
CREATE TABLE IF NOT EXISTS `am_gallery` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `subdomain` VARCHAR(255) NOT NULL,
  `category_id` INT DEFAULT NULL,
  `image_url` VARCHAR(500) NOT NULL,
  `status` TINYINT DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. am_our_story
-- Note: strContent is the column inserted/updated by backend JS ({ strContent: ... }).
-- content is a generated column that mirrors strContent so SELECT queries returning `content` work seamlessly.
DROP TABLE IF EXISTS `am_our_story`;
CREATE TABLE `am_our_story` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `subdomain` VARCHAR(255) NOT NULL,
  `strContent` TEXT NOT NULL,
  `content` TEXT GENERATED ALWAYS AS (`strContent`) STORED,
  `status` TINYINT DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. am_price_list
-- Initialized with default benchmark rows so UPDATE queries from backend match existing rows.
CREATE TABLE IF NOT EXISTS `am_price_list` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `material` VARCHAR(100) NOT NULL,
  `purity` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10, 2) NOT NULL,
  UNIQUE KEY `unique_material_purity` (`material`, `purity`)
);

-- Seed initial price rows for gold & silver
INSERT INTO `am_price_list` (`material`, `purity`, `price`) VALUES
('gold', '24k', 7850.00),
('gold', '22k', 7195.00),
('gold', '18k', 5890.00),
('silver', '18k', 94.50),
('silver', '22k', 94.50),
('silver', '24k', 94.50)
ON DUPLICATE KEY UPDATE `price` = VALUES(`price`);
