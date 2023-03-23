CREATE DATABASE IF NOT EXISTS Petcare;

-- INSERT INTO Users VALUES(username, email, password);
SELECT *
FROM users;

-- INSERT INTO PetOwner VALUES (username);
SELECT u.*
FROM PetOwner po, users u
WHERE po.uname = u.uname

-- INSERT INTO Caretaker VALUES (username);
SELECT u.*
FROM CareTaker ct, users u
WHERE ct.uname = u.uname

-- INSERT INTO Pet VALUES (username, name, diet)
SELECT * 
FROM Pet;

SELECT *
FROM Pet p
WHERE LOWER(p.uname) = 'cd';

-- INSERT INTO Availability (uname, s_date, s_time, e_time)
SELECT *
FROM Availability
WHERE s_date >= DATE '1990-1-1'
AND s_date <= DATE '1990-1-1'
AND s_time >= TIME '12:00:00'
AND e_time <= TIME '15:00:00'

SELECT *
FROM Availability

-- INSERT INTO Bid (pouname ,name ,ctuname, s_date, s_time, e_time, price, rating);
SELECT *
FROM Bid;
