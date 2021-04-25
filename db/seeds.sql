use employeedb;

/*department inserts*/ 
INSERT INTO department (department_name)
VALUES ('Sales'),
('Accounts Receivable'),
('Human Resources'),
('Development'),
('Custodial Arts'),
('Legal');

/*role inserts*/

INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 100000, 1),
('Accountant',100000, 2),
('Law Blogger', 100000,6),
('Engineer', 80000, 4),
('Onboarding Director', 80000, 3),
('Intern', 50000, 4),
('Database Designer', 80000, 4),
('Janitor', 5000, 5);

/*employee inserts*/
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bob', 'Loblaw', 3, NULL),
('Dennis', 'Reynolds', 1, NULL),
('Frank', 'Reynolds', 2, NULL),
('George', 'Costanza', 4, 3),
('Albert', 'Schmidt', 7, 2),
('Dee', 'Reynolds', 4, 1),
('Charlee', 'Day', 7, 2);







/*FOR REFERENCE*/

/*joins*/

/*example join*/ 
SELECT first_name,last_name, role.title, role.salary
    from employee
    inner join role
       on employee.role_id = role.id
    order by last_name;


/*Join Employee and Role and display Manager Name*/
SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, coalesce(CONCAT(manager.first_name, " ", manager.last_name), 'None')  AS Manager_Name
    from employee
    left join role 
    on employee.role_id = role.id
    left join department 
    on role.department_id = department.id
    left join employee manager
    on manager.id = employee.manager_id
    order by employee.id;



/*updates*/
UPDATE employee
SET first_name = 'Albert', last_name = 'Shmidt'
WHERE id=3;

/*deletes*/
DELETE FROM employee
WHERE id=20;

DELETE FROM role
WHERE id=20;

DELETE FROM department
WHERE id=20;