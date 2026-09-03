# Guildboard

---------------------!!! IMPORTANT !!!--------------------

1 - Install PostgresSQL

2 - LINK DATABASE

Create .env file into backend folder with :

    DB_URL=jdbc:postgresql://localhost:5432/guildboard-bd
    DB_USERNAME=username
    DB_PASSWORD=password

3 - In terminal do :

    createdb -U postgres guildboard

      or 
    
    (SQL)
    CREATE DATABASE guildboard; 

      or 

    (Docker)
    docker exec -it guildboard-db createdb -U postgres guildboard-bd

4 - Run the project into Backend folder

    mvn spring-boot:run

---------------------!!! IMPORTANT !!!--------------------