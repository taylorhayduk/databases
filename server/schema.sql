CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (messageID INT NOT NULL AUTO_INCREMENT, 
                       text varchar(255), 
                       roomID INT, 
                       userID INT,
                       PRIMARY KEY (messageID)
  /* Describe your table here.*/
);

CREATE TABLE rooms (roomID INT NOT NULL AUTO_INCREMENT,
                    roomname varchar(30) UNIQUE,
                    PRIMARY KEY (roomID)
);
CREATE TABLE users (userID INT NOT NULL AUTO_INCREMENT,
                    username varchar(30) UNIQUE,
                    PRIMARY KEY (userID)
);
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/
