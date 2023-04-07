All the sql queries kept here in case i need some of them back..can remove once done with main sql queries section


--Insertion into users table upon successful sign up
INSERT INTO users (username, email, password) 
VALUES ('{username}','{email}','{password}');

--Check if email exists during sign up
--Check if email matches entry during log in
SELECT * 
FROM users 
WHERE email LIKE '{email}';

--Check if username exists during sign up
SELECT * 
FROM users 
WHERE username LIKE '{username}';

--Insertion into petsitters table after successful form submission
INSERT INTO petsitters (username, startDate, endDate, 
price, dog, cat, 
petBoarding, dogWalking, petGrooming,
petDaycare, petSitting, petTaxi)
VALUES ('{sitterUname}','{sitterSDate}','{sitterEDate}',
'{sitterPrice}','{sitterDog}','{sitterCat}',
'{sitterPetBoarding}','{sitterDogWalking}','{sitterPetGrooming}',
'{sitterPetDaycare}','{sitterPetSitting}','{sitterPetTaxi}');

--Check if petsitter profile already exists
SELECT username
FROM petsitters
WHERE username LIKE '{sitterUname}';

--Update current petsitter profile if it already exists
UPDATE petsitters
SET startDate = '{sitterSDate}', endDate = '{sitterEDate}', price = '{sitterPrice}', dog = '{sitterDog}', cat = '{sitterCat}', petBoarding = '{sitterPetBoarding}', dogWalking = '{sitterDogWalking}', petGrooming = '{sitterPetGrooming}',
petDaycare = '{sitterPetDaycare}', petSitting = '{sitterPetSitting}', petTaxi = '{sitterPetTaxi}'
WHERE username LIKE '{sitterUname}';

--Delete petsitter profile
DELETE FROM petsitters
WHERE username LIKE '{username}';

--Provide output for find-services page
SELECT * 
FROM petsitters;

--Insertion into jobs table upon hiring a petsitter
INSERT INTO jobs (hirer_username, sitter_username)
VALUES ('{hirerUname}','{sitterUname}');

--View hired sitters
SELECT id, sitter_username, email, status
FROM jobs
INNER JOIN users
ON sitter_username = username
WHERE hirer_username LIKE '{username}';

--View my jobs
SELECT id, hirer_username, email, status
FROM jobs
INNER JOIN users
ON hirer_username = username
WHERE sitter_username LIKE '{username}';

--Update job status to ‘In Progress’
UPDATE jobs SET status = 'In Progress' WHERE id = :job_id

--Update job status to ‘Cancelled’
UPDATE jobs SET status = 'Cancelled' WHERE id = :job_id

--Update job status to ‘Completed’
UPDATE jobs SET status = 'Completed' WHERE id = :job_id

--View all other user accounts other than admin
SELECT username, email
FROM users
EXCEPT
SELECT username, email
FROM users
WHERE username LIKE 'admin';

--Deletion of user accounts from admin interface
DELETE FROM petsitters WHERE username = :username
DELETE FROM users WHERE username = :username

--DASHBOARD QUERIES
--number of users
SELECT COUNT(*) FROM users

--number of petsitters
SELECT COUNT(*) FROM petsitters

--percentage of users who are petsitters for dashboard
SELECT ROUND(((SELECT COUNT(*) * 100.0 FROM petsitters) / COUNT(*) ), 2) as percentage_petsitters
FROM users;

--top 5 most expensive petsitters who offer petboarding services
SELECT username, price FROM petsitters
WHERE petBoarding = true
ORDER BY price
DESC LIMIT 5;

--number of users who have not made any bookings with petsitters
SELECT COUNT(username)
FROM users 
WHERE username NOT IN (
SELECT DISTINCT hirer_username
FROM jobs);

--average price rate of petsitters who have completed jobs
SELECT ROUND(AVG(price),2)
FROM petsitters
WHERE username IN (
SELECT sitter_username
FROM jobs
WHERE status = 'Completed');

--top 3 most popular services offered by petsitters
SELECT 'petBoarding' AS service,
SUM(CASE WHEN petBoarding = 'TRUE' THEN 1 ELSE 0 END) AS count
FROM petsitters
UNION ALL
SELECT 'dogWalking' AS service,
SUM(CASE WHEN dogWalking = 'TRUE' THEN 1 ELSE 0 END) AS count
FROM petsitters
UNION ALL
SELECT 'petGrooming' AS service,
SUM(CASE WHEN petGrooming = 'TRUE' THEN 1 ELSE 0 END) AS count
FROM petsitters
UNION ALL
SELECT 'petDaycare' AS service,
SUM(CASE WHEN petDaycare = 'TRUE' THEN 1 ELSE 0 END) AS count
FROM petsitters
UNION ALL
SELECT 'petSitting' AS service,
SUM(CASE WHEN petSitting = 'TRUE' THEN 1 ELSE 0 END) AS count
FROM petsitters
UNION ALL
SELECT 'petTaxi' AS service,
SUM(CASE WHEN petTaxi = 'TRUE' THEN 1 ELSE 0 END) AS count
FROM petsitters
ORDER BY count DESC
LIMIT 3;