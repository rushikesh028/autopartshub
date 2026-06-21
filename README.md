# AutoPartsHub

AutoPartsHub is a Spring Boot-based e-commerce backend application designed for managing and purchasing automotive spare parts. The application provides secure JWT authentication, role-based access control, product management, shopping cart operations, and order processing through RESTful APIs.

---

## 🚀 Live Demo

**Railway Deployment**

https://autopartshub.up.railway.app

---

## 🐳 Docker Hub

Pull the Docker image:

```bash
docker pull rushikesh0628/autopartshub:latest
```

Run the container:

```bash
docker run -p 8081:8080 rushikesh0628/autopartshub:latest
```

Application URL:

```text
http://localhost:8081
```

---

## ✨ Features

* User Registration and Authentication
* JWT-Based Authentication & Authorization
* Role-Based Access Control (Admin, Seller, Buyer)
* Product Management
* Category Management
* Shopping Cart Functionality
* Order Processing
* RESTful API Architecture
* MySQL Database Integration
* Docker Containerization
* Cloud Deployment using Railway

---

## 🛠 Tech Stack

### Backend

* Java 17
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate

### Database

* MySQL

### Build & Deployment

* Maven
* Docker
* Railway

### Tools

* Git
* GitHub
* Postman

---

## 📁 Project Structure

```text
src
├── controller
├── service
├── repository
├── entity
├── dto
├── security
├── config
├── exception
└── util
```

---

## ⚙️ Getting Started

### Prerequisites

* Java 17+
* Maven
* MySQL
* Git

### Clone Repository

```bash
git clone https://github.com/rushikesh0628/autopartshub.git
cd autopartshub
```

### Configure Database

Update the `application.properties` file:

```properties
spring.datasource.url=${DB_URL:jdbc:mysql://host.docker.internal:3306/autopartshub}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

spring.jpa.hibernate.ddl-auto=update
```

### Run Application

```bash
mvn spring-boot:run
```

Application will start on:

```text
http://localhost:8080
```

---

## 🔐 Security Features

* JWT Authentication
* BCrypt Password Encryption
* Stateless Authentication
* Protected REST Endpoints
* Role-Based Authorization
* Secure Login & Registration APIs

---

## 📦 API Modules

### Authentication

* Register User
* Login User
* JWT Token Generation

### Product Management

* Add Product
* Update Product
* Delete Product
* Get Product Details
* Search Products

### Category Management

* Create Category
* Update Category
* Delete Category
* View Categories

### Cart Management

* Add to Cart
* Remove from Cart
* Update Quantity
* View Cart

### Order Management

* Place Order
* View Orders
* Order History

---

## 🐳 Docker Deployment

### Build Docker Image

```bash
docker build -t autopartshub .
```

### Run Docker Container

```bash
docker run -p 8081:8080 autopartshub
```

### Pull from Docker Hub

```bash
docker pull rushikesh0628/autopartshub:latest
```

---

## ☁️ Cloud Deployment

### Railway

Live URL:

https://autopartshub.up.railway.app

### Docker Hub Repository

```text
rushikesh0628/autopartshub
```

---

## 🎯 Project Highlights

* Developed a secure e-commerce backend for automotive spare parts.
* Implemented JWT-based authentication and authorization.
* Built scalable REST APIs following Spring Boot best practices.
* Integrated MySQL using Spring Data JPA and Hibernate.
* Containerized the application using Docker.
* Published Docker image to Docker Hub.
* Deployed the application on Railway for public access.

---

## 🚀 Future Enhancements

* Payment Gateway Integration
* Product Reviews and Ratings
* Wishlist Functionality
* Email Notifications
* Admin Dashboard
* Order Tracking
* CI/CD Pipeline Integration
* Microservices Architecture

---

## 👨‍💻 Author

**Rushikesh Asawale**

Java Backend Developer

GitHub: https://github.com/rushikesh0628

LinkedIn: Add your LinkedIn profile URL here

---

## ⭐ Support

If you found this project useful, consider giving it a star on GitHub.
