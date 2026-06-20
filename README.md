# AutoPartsHub

AutoPartsHub is a Spring Boot-based e-commerce backend application for managing and purchasing automotive spare parts. The application provides secure JWT authentication, role-based authorization, product management, shopping cart operations, and order processing through RESTful APIs.

## Live Demo

Application URL:

https://autopartshub.up.railway.app

## Docker Image

```bash
docker pull rushikesh0628/autopartshub:latest
```

Run locally:

```bash
docker run -p 8081:8080 rushikesh0628/autopartshub:latest
```

## Features

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
* Cloud Deployment on Railway

## Tech Stack

* Java 17
* Spring Boot
* Spring Security
* JWT
* Spring Data JPA
* Hibernate
* MySQL
* Maven
* Docker
* Railway

## Project Structure

```text
src
├── controller
├── service
├── repository
├── entity
├── dto
├── security
├── config
└── exception
```

## Getting Started

### Prerequisites

* Java 17+
* Maven
* MySQL

### Clone Repository

```bash
git clone https://github.com/rushikesh0628/autopartshub.git
cd autopartshub
```

### Configure Database

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/autopartshub
spring.datasource.username=root
spring.datasource.password=your_password
```

### Run Application

```bash
mvn spring-boot:run
```

Application will start on:

```text
http://localhost:8080
```

## API Modules

### Authentication

* Register User
* Login User
* JWT Token Generation

### Product Management

* Add Product
* Update Product
* Delete Product
* View Products

### Cart Management

* Add to Cart
* Remove from Cart
* Update Quantity

### Order Management

* Place Order
* View Orders
* Order History

## Security

* JWT Authentication
* BCrypt Password Encryption
* Role-Based Authorization
* Protected API Endpoints

## Deployment

### Railway

Live URL:

https://autopartshub.up.railway.app

### Docker Hub

```bash
docker pull rushikesh0628/autopartshub:latest
```

## Future Enhancements

* Payment Gateway Integration
* Product Reviews & Ratings
* Wishlist Functionality
* Email Notifications
* Admin Dashboard
* Microservices Architecture
* CI/CD Pipeline Integration

## Author

**Rushikesh Asawale**

Java Backend Developer

GitHub: https://github.com/rushikesh0628
