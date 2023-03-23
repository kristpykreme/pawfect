INSERT INTO Users VALUES ('WA', 'emcclune0@xrea.com' ,'A');
INSERT INTO Users VALUES ('WB', 'fingleston1@hibu.com', 'B');
INSERT INTO Users VALUES ('WC', 'tbergstram2@pbs.org', 'C');
INSERT INTO Users VALUES ('WD', 'hknighton3@booking.com','D');
INSERT INTO Users VALUES ('WE', 'snaulty4@hud.gov','E');

INSERT INTO Users VALUES ('CA', 'acockayme5@tuttocitta.it', 'A');
INSERT INTO Users VALUES ('CB', 'csharvill6@narod.ru', 'B');
INSERT INTO Users VALUES ('CC', 'lricket7@washington.edu', 'C');
INSERT INTO Users VALUES ('CD', 'flicciardiello8@sina.com.cn', 'D');
INSERT INTO Users VALUES ('CE', 'gjonas9@typepad.com', 'E');
INSERT INTO Users VALUES ('CF', 'atarbatha@t.co', 'F');
INSERT INTO Users VALUES ('CG', 'jdevilb@upenn.edu', 'G');
INSERT INTO Users VALUES ('CH', 'dhalvorsenc@loc.gov', 'H');
INSERT INTO Users VALUES ('CI', 'kdriuttid@skyrock.com', 'I');
INSERT INTO Users VALUES ('CJ', 'dabramse@godaddy.com', 'J');


INSERT INTO CareTaker VALUES ('CA');
INSERT INTO CareTaker VALUES ('CB');
INSERT INTO CareTaker VALUES ('CC');
INSERT INTO CareTaker VALUES ('CD');
INSERT INTO CareTaker VALUES ('CE');
INSERT INTO CareTaker VALUES ('CF');

INSERT INTO PetOwner VALUES ('CD');
INSERT INTO PetOwner VALUES ('CE');
INSERT INTO PetOwner VALUES ('CF');
INSERT INTO PetOwner VALUES ('CG');
INSERT INTO PetOwner VALUES ('CH');
INSERT INTO PetOwner VALUES ('CI');
INSERT INTO PetOwner VALUES ('CJ');

INSERT INTO Pet VALUES ('CD', 'Pet1', 'D1');
INSERT INTO Pet VALUES ('CD', 'Pet2', 'D2');
INSERT INTO Pet VALUES ('CE', 'Pet1', 'D1');
INSERT INTO Pet VALUES ('CE', 'Pet2', 'D2');
INSERT INTO Pet VALUES ('CF', 'Pet1', 'D1');
INSERT INTO Pet VALUES ('CG', 'Pet2', 'D1');
INSERT INTO Pet VALUES ('CH', 'Pet3', 'D1');

INSERT INTO Availability VALUES ('CA', DATE('1990-1-1'), '12:00:00', '13:00:00');
INSERT INTO Availability VALUES ('CA', DATE('1990-1-1'), '13:00:00', '14:00:00');
INSERT INTO Availability VALUES ('CA', DATE('1990-1-1'), '14:00:00', '15:00:00');
INSERT INTO Availability VALUES ('CA', DATE('1990-1-1'), '15:00:00', '16:00:00');
INSERT INTO Availability VALUES ('CB', DATE('1990-1-1'), '12:00:00', '13:00:00');
INSERT INTO Availability VALUES ('CC', DATE('1990-1-1'), '12:00:00', '13:00:00');
INSERT INTO Availability VALUES ('CC', DATE('1990-1-1'), '13:00:00', '14:00:00');
INSERT INTO Availability VALUES ('CE', DATE('1990-1-1'), '12:00:00', '13:00:00');

INSERT INTO Bid VALUES ('CD', 'Pet1', 'CA', DATE('1990-1-1'), '12:00:00', '13:00:00', 200, null);
INSERT INTO Bid VALUES ('CD', 'Pet2', 'CA', DATE('1990-1-1'), '12:00:00', '13:00:00', 200, null);
INSERT INTO Bid VALUES ('CD', 'Pet1', 'CA', DATE('1990-1-1'), '13:00:00', '14:00:00', 200, null);
INSERT INTO Bid VALUES ('CD', 'Pet2', 'CA', DATE('1990-1-1'), '13:00:00', '14:00:00', 200, null);
INSERT INTO Bid VALUES ('CD', 'Pet1', 'CA', DATE('1990-1-1'), '14:00:00', '15:00:00', 200, null);
INSERT INTO Bid VALUES ('CD', 'Pet2', 'CA', DATE('1990-1-1'), '14:00:00', '15:00:00', 200, null);
INSERT INTO Bid VALUES ('CE', 'Pet1', 'CA', DATE('1990-1-1'), '12:00:00', '13:00:00', 200, null);
INSERT INTO Bid VALUES ('CE', 'Pet2', 'CA', DATE('1990-1-1'), '13:00:00', '14:00:00', 200, null);
INSERT INTO Bid VALUES ('CE', 'Pet1', 'CA', DATE('1990-1-1'), '14:00:00', '15:00:00', 200, null);
INSERT INTO Bid VALUES ('CE', 'Pet2', 'CA', DATE('1990-1-1'), '15:00:00', '16:00:00', 200, null);
INSERT INTO Bid VALUES ('CF', 'Pet1', 'CA', DATE('1990-1-1'), '12:00:00', '13:00:00', 200, null);
INSERT INTO Bid VALUES ('CF', 'Pet1', 'CA', DATE('1990-1-1'), '13:00:00', '14:00:00', 200, null);
INSERT INTO Bid VALUES ('CF', 'Pet1', 'CA', DATE('1990-1-1'), '14:00:00', '15:00:00', 200, null);
INSERT INTO Bid VALUES ('CF', 'Pet1', 'CA', DATE('1990-1-1'), '15:00:00', '16:00:00', 200, null);
INSERT INTO Bid VALUES ('CG', 'Pet2', 'CE', DATE('1990-1-1'), '12:00:00', '13:00:00', 200, null);
INSERT INTO Bid VALUES ('CH', 'Pet3', 'CC', DATE('1990-1-1'), '13:00:00', '14:00:00', 200, null);
INSERT INTO Bid VALUES ('CH', 'Pet3', 'CE', DATE('1990-1-1'), '12:00:00', '13:00:00', 200, null);
