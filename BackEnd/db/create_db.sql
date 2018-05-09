-- Use this file as a reference to create the database on a new machine

-- Login as Root User with no password
mysql -u root

-- Login as Root User with password
mysql -u root -p

CREATE DATABASE workinzadb;
USE workinzadb;
CREATE USER srastogi IDENTIFIED BY 'titpw';
GRANT ALL PRIVILEGES ON * TO srastogi@'%';
EXIT

-- Login as custom user with password
mysql -u srastogi -p