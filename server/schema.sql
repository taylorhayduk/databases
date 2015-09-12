CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (messagesID INT NOT NULL AUTO_INCREMENT, 
                       messageText varchar(255), 
                       roomID INT, 
                       userID INT,
                       PRIMARY KEY (messagesID)
  /* Describe your table here.*/
);

CREATE TABLE rooms (roomID INT NOT NULL AUTO_INCREMENT,
                    roomName varchar(30),
                    PRIMARY KEY (roomID)
);
CREATE TABLE users (userID INT NOT NULL AUTO_INCREMENT,
                    userName varchar(30),
                    PRIMARY KEY (userID)
);
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

DESCRIBE messages;