# 🏠 Accommodation Finder App

> A real-time web application to search, filter, and book student/professional accommodations — built as a portfolio project at **EPITA Paris**.

![Java](https://img.shields.io/badge/Java-17-orange?style=flat-square&logo=java)
![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.x-brightgreen?style=flat-square&logo=springboot)
![WebSocket](https://img.shields.io/badge/WebSocket-Real--Time-blue?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square&logo=javascript)
![MySQL](https://img.shields.io/badge/MySQL-8.0-blue?style=flat-square&logo=mysql)
![Status](https://img.shields.io/badge/Status-In%20Progress-yellow?style=flat-square)

---

## 🎯 Problem It Solves

Finding accommodation as a student or newcomer is stressful — listings go fast, availability is unclear, and communication with landlords is slow. This app solves that with **real-time room availability**, instant notifications, and a clean search interface.

---

## ✨ Features

- 🔍 **Search & Filter** rooms by city, price, size, and availability
- 📡 **Real-Time Updates** — room status changes instantly via WebSocket (no page refresh)
- 🔔 **Instant Alerts** — get notified when a matching room becomes available
- 📅 **Booking System** — request and confirm bookings directly in the app
- 🗺️ **Map View** — see rooms on an interactive map (Leaflet.js)
- 👤 **User Profiles** — tenant and landlord accounts with dashboards
- 💬 **Live Chat** — real-time messaging between tenant and landlord

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Java 17 + Spring Boot 3 |
| Real-Time | WebSocket (STOMP + SockJS) |
| Frontend | HTML5 + CSS3 + JavaScript (Vanilla / React) |
| Database | MySQL 8 |
| Maps | Leaflet.js |
| Auth | Spring Security + JWT |
| Deployment | Railway.app / Render.com |

---

## 📁 Project Structure

```
accommodation-finder/
├── backend/
│   ├── src/main/java/com/accommodationfinder/
│   │   ├── controller/       # REST + WebSocket controllers
│   │   ├── model/            # Room, User, Booking entities
│   │   ├── repository/       # JPA repositories
│   │   ├── service/          # Business logic
│   │   └── config/           # WebSocket & Security config
│   └── src/main/resources/
│       └── application.properties
├── frontend/
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       ├── app.js            # Main app logic
│       ├── websocket.js      # Real-time connection
│       └── map.js            # Leaflet map integration
├── database/
│   └── schema.sql            # DB schema
└── README.md
```

---

## 🗄️ Database Schema (Overview)

```sql
-- Users (tenants & landlords)
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('TENANT', 'LANDLORD'),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Rooms
CREATE TABLE rooms (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(200),
    description TEXT,
    city VARCHAR(100),
    address VARCHAR(255),
    price DECIMAL(10,2),
    size_sqm INT,
    available BOOLEAN DEFAULT TRUE,
    landlord_id BIGINT,
    latitude DECIMAL(9,6),
    longitude DECIMAL(9,6),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (landlord_id) REFERENCES users(id)
);

-- Bookings
CREATE TABLE bookings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    room_id BIGINT,
    tenant_id BIGINT,
    status ENUM('PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED'),
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id),
    FOREIGN KEY (tenant_id) REFERENCES users(id)
);
```

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven 3.8+
- MySQL 8+
- Node.js (optional, for frontend dev server)

### Backend Setup
```bash
git clone https://github.com/akhil3969/accommodation-finder.git
cd accommodation-finder/backend

# Configure DB in application.properties
mvn spring-boot:run
```

### Database Setup
```bash
mysql -u root -p < database/schema.sql
```

### Frontend
Open `frontend/index.html` in your browser, or run a local server:
```bash
npx serve frontend/
```

---

## 📌 Roadmap

- [x] Project setup & repository structure
- [ ] Backend: Room CRUD API
- [ ] Backend: WebSocket real-time availability
- [ ] Frontend: Search & filter UI
- [ ] Frontend: Map integration
- [ ] Booking system
- [ ] Live chat between tenant & landlord
- [ ] JWT Authentication
- [ ] Deployment on Railway.app

---

## 👨‍💻 Author

**Kona Sai Akhil**  
MSc Student @ EPITA Paris  
[![GitHub](https://img.shields.io/badge/GitHub-akhil3969-black?style=flat-square&logo=github)](https://github.com/akhil3969)

---

## 📄 License

MIT License — free to use and modify.
