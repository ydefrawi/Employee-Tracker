/*FOR REFERENCE*/

/*joins*/
/*example join*/ 
SELECT first_name,last_name, role.title, role.salary
    from employee
    inner join role
       on employee.role_id = role.id
    order by last_name;


/*Join Employee and Role and display Manager Name. Can concatenate fields and display whatever column title you want by using ' AS'. 
The join below also replaces 'null' values with 'None' for readability  */
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
WHERE id=1;

DELETE FROM role
WHERE id=1;

DELETE FROM department
WHERE id=1;

/*view employees by manager*/

/*this shows all employees who are managers. Joins employee and role to grab the manager's role to display in the inquirer prompt*/ 
SELECT employee.id, first_name, last_name, role.title AS Role
FROM employee 
left join role 
on employee.role_id = role.id
WHERE (employee.id IN (SELECT manager_id FROM employee));

/*This shows all employees whos manager_id is 3. */
SELECT id, first_name, last_name, manager_id
FROM employee
WHERE manager_id=3