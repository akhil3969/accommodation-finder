-- Accommodation Finder - Database Schema
-- Author: Kona Sai Akhil | EPITA Paris

CREATE DATABASE IF NOT EXISTS accommodation_finder;
USE accommodation_finder;

CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('TENANT', 'LANDLORD') NOT NULL DEFAULT 'TENANT',
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE rooms (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    city VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    price DECIMAL(10,2) NOT NULL,
    size_sqm INT,
    available BOOLEAN DEFAULT TRUE,
    room_type ENUM('STUDIO', 'SHARED', 'APARTMENT', 'HOUSE') DEFAULT 'STUDIO',
    landlord_id BIGINT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    images TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (landlord_id) REFERENCES users(id)
);

CREATE TABLE bookings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    room_id BIGINT NOT NULL,
    tenant_id BIGINT NOT NULL,
    status ENUM('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED') DEFAULT 'PENDING',
    message TEXT,
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (tenant_id) REFERENCES users(id)
);

CREATE TABLE messages (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    sender_id BIGINT NOT NULL,
    receiver_id BIGINT NOT NULL,
    booking_id BIGINT,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_read BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (sender_id) REFERENCES users(id),
    FOREIGN KEY (receiver_id) REFERENCES users(id),
    FOREIGN KEY (booking_id) REFERENCES bookings(id)
);

-- Sample Data
INSERT INTO users (name, email, password, role) VALUES
('Akhil Kona', 'akhil@epita.fr', 'hashed_password', 'TENANT'),
('Jean Dupont', 'jean@landlord.fr', 'hashed_password', 'LANDLORD');

INSERT INTO rooms (title, description, city, address, price, size_sqm, available, room_type, landlord_id, latitude, longitude) VALUES
('Cozy Studio near EPITA', 'Modern studio 5 min from EPITA campus, all inclusive', 'Le Kremlin-Bicêtre', '12 Rue de la Liberté', 750.00, 22, TRUE, 'STUDIO', 2, 48.8145, 2.3607),
('Shared Room Paris 13', 'Room in shared 3-bedroom apartment, great transport links', 'Paris', '45 Avenue d\'Italie', 550.00, 15, TRUE, 'SHARED', 2, 48.8271, 2.3601);
