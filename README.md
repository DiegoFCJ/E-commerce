# OfficeOasis Backend

**Version:** 0.0.1-SNAPSHOT

The OfficeOasis backend is built with **Spring Boot** and serves as the server-side component for the OfficeOasis application. It provides RESTful APIs for managing office-related data and features robust security measures, including JWT authentication and email services.

## 📸 Project Overview

> **Add screenshots or diagrams here** to give users a visual overview of the backend structure or API documentation.

## 🚀 Technologies Used

### Framework
- **Spring Boot** (version 3.1.7) - A framework that simplifies the development of Java applications, especially for web services.

### Database
- **MySQL** - A relational database management system used for storing and managing application data.

### Dependencies
- **Spring Web** - Provides features for building web applications, including RESTful services.
- **Spring Data JPA** - Simplifies database interactions using JPA (Java Persistence API).
- **Spring Security** - Implements authentication and authorization for securing the application.
- **JWT (JSON Web Token)** - Used for secure token-based authentication.
- **Spring Mail** - Enables sending emails from the application.
- **SpringDoc OpenAPI** - For generating API documentation.

### Security
- **Spring Security Core, Config, Web** - Core components for authentication and authorization.
- **argon2-jvm** - A password hashing algorithm used for securely storing user passwords.

### Testing
- **Spring Boot Starter Test** - Provides testing support for Spring Boot applications.

### Build Tool
- **Maven** - A build automation tool used for managing project dependencies and building the application.

## 🌐 Deployment

The application can be packaged as a Docker container and deployed on various cloud platforms or local servers.

## 🛠️ Getting Started

To get started with the OfficeOasis backend locally, follow these steps:

### Prerequisites

Make sure you have the following installed:

- [Java JDK](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html) (version 17 or later)
- [Maven](https://maven.apache.org/download.cgi) (for building the project)
- [MySQL](https://dev.mysql.com/downloads/mysql/) (for database management)

### Clone the Repository

1. Open your terminal.
2. Clone the repository using the command:

   git clone https://github.com/DiegoFCJ/officeoasis-backend.git

3. Navigate into the project directory:

   cd officeoasis-backend

### Build the Project

Run the following command to build the project and download the necessary dependencies:

mvn clean install

### Run the Application Locally

To start the application locally, use the following command:

mvn spring-boot:run

The application will be accessible at [http://localhost:8080/](http://localhost:8080/).

### Conclusion

You are now set up to develop and test the OfficeOasis backend locally! Be sure to explore the RESTful APIs and test them using tools like Postman or curl.
