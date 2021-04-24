/*department*/
use employeedb;

INSERT INTO department (name)
VALUES ('Sales'),
('Accounts Receivable'),
('Human Resources');

/*roles*/
use employeedb;

INSERT INTO role (title, salary, department_id)
VALUES ('Manager', 100000, 4),
('Engineer', 80000, 4),
('Intern', 50000, 4);

/*employees*/
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Bob', 'Loblaw', 2, 1),
('George', 'Costanza', 2, 1),
('Intern', 50000, 2, 1);
