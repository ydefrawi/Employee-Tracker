use employeedb;

/*department inserts*/ 
INSERT INTO department (department_name)
VALUES 
('Operations'),
('Human Resources'),
('Information Technology'),
('Engineering');

/*role inserts*/

INSERT INTO role (title, salary, department_id)
VALUES 
('Cheif Executive Officer', 200000, 1),
('Cheif Operating Officer',150000, 1),
('Chief Engineer', 120000,4),
('Junior Engineer', 80000, 4),
('Health and Safety Specialist', 120000, 2),
('Organizational Psychologist',90000,2),
('Data Protection Officer', 100000, 3),
('Intern', 50000, 1),
('Business Strategist', 105000, 1),
('Morale Specialist', 90000, 2),
('Developer', 80000,3);

/*employee inserts*/
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jean-Luc', 'Picard', 1, NULL),
('William T.', 'Riker', 2, 1),
('Geordi', 'LaForge', 3, 1),
('Beverly', 'Crusher', 5, 1),
('Deanna', 'Troi', 6, 1),
('Miles', "O'Brien", 4, 3),
('Wesley', 'Crusher', 8, 3),
('Worf','Moghson', 7, 1),
('Ro','Laren', 9, 2),
('Guinan','Goldberg',10, 1),
('Reginald','Barclay',11,3);

