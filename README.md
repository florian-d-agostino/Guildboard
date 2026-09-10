# Guildboard

---------------------!!! IMPORTANT !!!--------------------

### 1 - Install PostgreSQL (or Docker)

### 2 - Database Configuration

Create the file `application-local.yml` in the folder `backend/src/main/resources/` with your database credentials:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/guildboard
    username: <your_username>
    password: <your_password>
```

> **Note:** This file is ignored by Git (`.gitignore`) so your local credentials won't be committed.

### 3 - Create Database

Make sure the database exists:

```bash
createdb -U postgres guildboard
```

or with SQL:
```sql
CREATE DATABASE guildboard;
```

or with Docker:
```bash
docker exec -it guildboard-db createdb -U postgres guildboard
```

### 4 - Run the Project

In the `backend` folder, run:

```bash
mvn spring-boot:run
```

Swagger UI is available at: `http://localhost:8080/swagger-ui.html`

---------------------!!! IMPORTANT !!!--------------------