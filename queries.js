const currentEmployeeQuery = `SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS Employee_Name, role.title AS Title, role.salary AS Salary, department.department_name AS Department, coalesce(CONCAT(manager.first_name, " ", manager.last_name), 'None')  AS Manager_Name
from employee
left join role 
on employee.role_id = role.id
left join department 
on role.department_id = department.id
left join employee manager
on manager.id = employee.manager_id
order by employee.id;`

const newEmpMgrQuery=`SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS Employee_Name, role.title AS Role, department.department_name AS Department, coalesce(CONCAT(manager.first_name, " ", manager.last_name), 'None')  AS New_Manager
from employee
left join role 
on employee.role_id = role.id
left join department 
on role.department_id = department.id
left join employee manager
on manager.id = employee.manager_id`

const newRoleQuery=`SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS Employee_Name, role.title AS New_Role, department.department_name AS Department, coalesce(CONCAT(manager.first_name, " ", manager.last_name), 'None')  AS Manager
from employee
left join role 
on employee.role_id = role.id
left join department 
on role.department_id = department.id
left join employee manager
on manager.id = employee.manager_id`

const viewByDeptQuery=`SELECT  department.department_name AS Department, CONCAT(employee.first_name, " ", employee.last_name) AS Employee_Name, employee.id AS Employee_ID, role.title AS Role, role.salary AS SALARY, coalesce(CONCAT(manager.first_name, " ", manager.last_name), 'None')  AS Manager_Name
from employee
left join role 
on employee.role_id = role.id
left join department 
on role.department_id = department.id
left join employee manager
on manager.id = employee.manager_id`

const departmentsQuery = 'SELECT * FROM employeedb.department;'
const rolesQuery = 'SELECT * FROM role'
const employeeTableQuery = 'SELECT * FROM employeedb.employee'
const managersQuery = 
`SELECT employee.id, first_name, last_name, role.title AS role
FROM employee 
left join role 
on employee.role_id = role.id
WHERE (employee.id IN (SELECT manager_id FROM employee));`

module.exports.currentEmployeeQuery = currentEmployeeQuery
module.exports.departmentsQuery = departmentsQuery
module.exports.rolesQuery = rolesQuery;
module.exports.employeeTableQuery = employeeTableQuery
module.exports.managersQuery=managersQuery
module.exports.newEmpMgrQuery=newEmpMgrQuery;
module.exports.newRoleQuery=newRoleQuery;
module.exports.viewByDeptQuery=viewByDeptQuery;