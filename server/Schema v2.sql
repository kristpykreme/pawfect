DROP TABLE IF EXISTS Bid CASCADE;
DROP TABLE IF EXISTS Availability CASCADE;
DROP TABLE IF EXISTS Pet CASCADE;
DROP TABLE IF EXISTS PetOwner CASCADE;
DROP TABLE IF EXISTS CareTaker CASCADE;
DROP TABLE IF EXISTS Users CASCADE;

CREATE TABLE Users (
  username     varchar(64) PRIMARY KEY,
  email     varchar(64) UNIQUE NOT NULL,
  password      varchar(64) NOT NULL
);

CREATE TABLE CareTaker (
  uname     varchar(50) PRIMARY KEY REFERENCES Users (username)
);

CREATE TABLE PetOwner (
  uname     varchar(50) PRIMARY KEY REFERENCES Users (username)
);

CREATE TABLE Pet (
  uname     varchar(50) REFERENCES PetOwner (uname)
                        ON DELETE cascade,
  name      varchar(50),
  diet      varchar(20) NOT NULL,
  PRIMARY KEY (uname, name)
);

CREATE TABLE Availability (
  uname     varchar(50) REFERENCES CareTaker (uname)
                        ON DELETE cascade,
  s_date    date,
  s_time    time,
  e_time    time,
  PRIMARY KEY (uname, s_date, s_time, e_time)
);

CREATE TABLE Bid (
  pouname   varchar(50),
  name      varchar(50),
  ctuname   varchar(50),
  s_date    date,
  s_time    time,
  e_time    time,
  price     numeric NOT NULL,
  rating    integer CHECK ((rating IS NULL) OR (rating >= 0 AND rating <= 5)),
  FOREIGN KEY (pouname, name) REFERENCES Pet (uname, name),
  FOREIGN KEY (ctuname, s_date, s_time, e_time) REFERENCES Availability (uname, s_date, s_time, e_time),
  PRIMARY KEY (pouname, name, ctuname, s_date, s_time, e_time),
  CHECK (pouname <> ctuname)
);
