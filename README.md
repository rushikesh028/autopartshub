# AutoPartsHub

AutoPartsHub is a Spring Boot-based e-commerce backend application designed for managing and purchasing automotive spare parts. The application provides secure authentication, product management, cart operations, and order processing through RESTful APIs.

## Features

* User Registration and Authentication
* JWT-Based Security
* Role-Based Access Control (Admin, Seller, Buyer)
* Product Management
* Category Management
* Shopping Cart Functionality
* Order Processing
* RESTful API Architecture
* MySQL Database Integration
* Docker Containerization

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
* Docker (Optional)

### Clone Repository

```bash
git clone https://github.com/your-username/AutoPartsHub.git
cd AutoPartsHub
```

### Database Configuration

Update `application.properties`:

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

## Docker Support

### Pull Docker Image

```bash
docker pull rushikesh0628/autopartshub:latest
```

### Run Container

```bash
docker run -p 8081:8080 rushikesh0628/autopartshub:latest
```

Application will be available at:

```text
http://localhost:8081
```

## API Features

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
* Password Encryption using BCrypt
* Role-Based Authorization
* Protected API Endpoints

## Future Enhancements

* Payment Gateway Integration
* Product Reviews and Ratings
* Wishlist Functionality
* Email Notifications
* Admin Dashboard
* Cloud Deployment

## Author

**Rushikesh Asawale**

Java Backend Developer

GitHub: https://github.com/rushikesh0628
