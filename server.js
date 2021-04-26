const mysql = require('mysql');
const path = require('path')
const inquirer = require ('inquirer');
const introAscii = `
███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗    ████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗ 
██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝    ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗
█████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗         ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝
██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝         ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗
███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗       ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║
╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝       ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝
                                                                                                                                  
`
const exitAscii=`\n██╗  ██╗ █████╗ ██╗   ██╗███████╗     █████╗     ███╗   ██╗██╗ ██████╗███████╗    ██████╗  █████╗ ██╗   ██╗██╗
██║  ██║██╔══██╗██║   ██║██╔════╝    ██╔══██╗    ████╗  ██║██║██╔════╝██╔════╝    ██╔══██╗██╔══██╗╚██╗ ██╔╝██║
███████║███████║██║   ██║█████╗      ███████║    ██╔██╗ ██║██║██║     █████╗      ██║  ██║███████║ ╚████╔╝ ██║
██╔══██║██╔══██║╚██╗ ██╔╝██╔══╝      ██╔══██║    ██║╚██╗██║██║██║     ██╔══╝      ██║  ██║██╔══██║  ╚██╔╝  ╚═╝
██║  ██║██║  ██║ ╚████╔╝ ███████╗    ██║  ██║    ██║ ╚████║██║╚██████╗███████╗    ██████╔╝██║  ██║   ██║   ██╗
╚═╝  ╚═╝╚═╝  ╚═╝  ╚═══╝  ╚══════╝    ╚═╝  ╚═╝    ╚═╝  ╚═══╝╚═╝ ╚═════╝╚══════╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚═╝`



// SQL Connection
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'Register1',
    database: 'employeedb',
  });
  
//Main Menu in Terminal
const mainMenu =  () => {
    inquirer
    .prompt({
      name: 'start',
      type: 'rawlist',
      message: 'What would you like to do?',
      choices: ['Add Department','Add Role','Add Employee', "Update An Employee's Role", "Update An Employee's Manager", "Update a Role's Salary", 'View Departments','View Roles','View Employees', 'View Employees By Department','View Employees By Manager', "View a Department's Total Budget", 'Delete Role','Delete Department','Delete Employee','Exit']
    })
    .then((answer => {
      switch (answer.start) {
          case "Add Employee":
            addEmployee();
            break
          case "Add Role":
            addRole();
            break
          case "Add Department":
            addDepartment();
            break
          case "Update An Employee's Role":
            updateRole();
            break
          case "Update An Employee's Manager":
            updateManager();
            break
          case "Update a Role's Salary":
            updateSalary();
            break
          case "View Departments":
            viewDepartments();
            break
          case "View Roles":
            viewRoles();
            break
          case "View Employees":
            viewAllEmp();
            break
          case "View Employees By Department":
            viewByDepartment();
            break
          case "View Employees By Manager":
            viewByManager();
            break
          case "View a Department's Total Budget":
            departmentBudget();
            break
          case "Delete Employee":
            deleteEmployee();
            break
          case "Delete Role":
            deleteRole();
            break
          case "Delete Department":
            deleteDepartment();
            break
          case "Exit":
            console.log(exitAscii)
            connection.end();
            break
      }
    }))
};


//Function that allows user to add a department with an INSERT query
addDepartment = () => {
  inquirer
    .prompt([
      {
        name: 'department',
        type: 'input',
        message: "Name of Department:"
      }
    ]).then((answer => {

      const query = `INSERT INTO department (department_name) VALUES ('${answer.department}')`
      connection.query(query, (err, res) => {
        if (err) throw err
        connection.query("SELECT * FROM employeedb.department;", (err, res) => {
          if (err) throw err
          console.table(res)
          console.log(`\n${answer.department} has been added to your departments!\n`)
          addAnotherDept();
        })
      })

    }))
}

//addDepartment() helper function that asks user if they wish to create another Department. Calls addDepartment() if Yes
addAnotherDept = () => {
  addAnother =
  {
    name: 'addDepartment',
    type: 'list',
    message: "Would you like to add another department?",
    choices: ['Yes', 'No']
  }

  inquirer
    .prompt(addAnother)
    .then((answer => {
      if (answer.addDepartment === 'Yes') {
        addDepartment();
        return;
      } else mainMenu();
    })
    )
}

//Function that prompts user for info on the employee they'd like to add
addEmployee = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw (err);
    const roleChoices = res.map((role) => {
      return {
        name: role.title,
        value: role.id
      }
    })
    connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw (err);
      const managerChoices = res.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        }
      })
      managerChoices.push("None")
      inquirer
        .prompt([
          {
            name: 'firstName',
            type: 'input',
            message: "Employee First Name:"
          },
          {
            name: 'lastName',
            type: 'input',
            message: "Employee Last Name:"
          },
          {
            name: 'role',
            type: 'list',
            message: "Select Role:",
            choices: roleChoices
          },
          {
            name: 'hasManager',
            type: 'list',
            message: "Does this employee have a manager?",
            choices: ['Yes','No']
          }
        ]).then((answer => {
          switch (answer.hasManager) {
            case "No":
              const query = `INSERT INTO employee (first_name, last_name, role_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.role}')`
              connection.query(query, (err, res) => {
                if (err) throw err
                connection.query("SELECT * FROM employeedb.employee;", (err, res) => {
                  if (err) throw err
                  console.table(res)
                  console.log(`${answer.firstName} ${answer.lastName} has been added to your employees!`)
                  addAnotherEmp();
                })
              })
              break
            case "Yes":
              selectManager(managerChoices,answer);
              break
        }
        }))
      })
  })
}

//addEmployee() helper function that allows user to select a manager if they have one
const selectManager = (managerChoices,answer) => {
  inquirer
        .prompt([
          {
            name:'managerName',
            type:'list',
            message:"Select Employee's Manager",
            choices: managerChoices
          }
        ]).then((mgrAnswer=>{
          const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}', '${answer.lastName}', '${answer.role}', '${mgrAnswer.managerName}')`
          connection.query(query, (err, res) => {
            if (err) throw err
            connection.query("SELECT * FROM employeedb.employee;", (err, res) => {
              if (err) throw err
              console.table(res)
              console.log(`${answer.firstName} ${answer.lastName} has been added to your employees!\n`)
              addAnotherEmp();
            })
          })
        }))
}

//addEmployee() helper function that asks user if they'd like to add another employee. If yes, calls, addEmployee(). Otherwise loops back to menu
addAnotherEmp = () => {
  addAnother =
  {
    name: 'addEmployee',
    type: 'list',
    message: "Would you like to add another employee?",
    choices: ['Yes', 'No']
  }

  inquirer
    .prompt(addAnother)
    .then((answer => {
      if (answer.addEmployee === 'Yes') {
        addEmployee();
        return;
      } else mainMenu();
    })
    )
}


//addRole(): Function that allows users to add a role. 
addRole = () => {
  connection.query('SELECT * FROM department', (err, res) => {
    if (err) throw (err);
    const deptChoices = res.map((department) => {
      return {
        name: department.department_name,
        value: department.id
      }
    })
      inquirer
        .prompt([
          {
            name: 'role',
            type: 'input',
            message: "Name of Role:"
          },
          {
            name: 'salary',
            type: 'input',
            message: "What is the role's salary?:"
          },
          {
            name: 'department',
            type: 'list',
            message: "To which department does this role belong:",
            choices: deptChoices
          },
        ]).then((answer => {

              const query = `INSERT INTO role (title, salary, department_id) VALUES ('${answer.role}', '${answer.salary}', '${answer.department}')`
              connection.query(query, (err, res) => {
                if (err) throw err
                connection.query("SELECT * FROM employeedb.role;", (err, res) => {
                  if (err) throw err
                  console.table(res)
                  console.log(`\n${answer.role} has been added to your roles!\n`)
                  addAnotherRole();
                })
              })
            
        }))
      })
  }

//helper function that asks user if they wish to create another role. Calls addRole() again if Yes.
addAnotherRole = () => {
  addAnother =
  {
    name: 'addRole',
    type: 'list',
    message: "Would you like to add another role?",
    choices: ['Yes', 'No']
  }

  inquirer
    .prompt(addAnother)
    .then((answer => {
      if (answer.addRole === 'Yes') {
        addRole();
        return;
      } else mainMenu();
    })
    )
}

updateRole = () => {
  connection.query('SELECT * FROM role', (err, res) => {
    if (err) throw (err);
    const roleChoices = res.map((role) => {
      return {
        name: role.title,
        value: role.id
      }
    })
    connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw (err);
      const employeeChoices = res.map((employee) => {
        return {
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id
        }
      })
      inquirer
        .prompt([
          {
            name: 'employee',
            type: 'list',
            message: "Which Employee's role would you like to update?",
            choices: employeeChoices
          },
          {
            name: 'role',
            type: 'list',
            message: "Which role would you like to assign to them?",
            choices: roleChoices
          },
        ]).then((answer => {
          console.log(answer)
          const query = `
              UPDATE employee
              SET role_id = ${answer.role}
              WHERE id=${answer.employee};`
          connection.query(query, (err, res) => {
            if (err) throw err
            connection.query("SELECT * FROM employeedb.employee;", (err, res) => {
              if (err) throw err
              console.table(res)
              console.log(`Employee's role has been updated!`)
              whatNow();
            })
          })

        }))
    })
  })
}

updateSalary = () => {
  const roleQuery = "SELECT * FROM employeedb.role;"
  connection.query(roleQuery, (err, res) => {
    if (err) throw (err);
    console.table(res)
    const roleChoices = res.map((role) => {
      return {
        name: role.title,
        value: role.id
      }
    })
    inquirer
    .prompt([
      {
        name: 'role',
        type: 'list',
        message: "Which role's salary would you like to update?",
        choices: roleChoices,
      },
      {
        name: 'salary',
        type: 'input',
        message: "Input new salary:",
      }
    ]).then((answer => {
      const salaryUpdate = `UPDATE role SET salary = '${answer.salary}' WHERE id=${answer.role};`
      connection.query(salaryUpdate, (err, res) => {
        if (err) throw (err);
        const updatedSalary = `SELECT title, salary FROM employeedb.role where id = ${answer.role}`
        connection.query(updatedSalary, (err, res) => {
          if (err) throw (err);
          console.table(res);
          console.log(`Role salary has been updated!\n`)
          whatNow();
        })
      })

    }))
  })
}

updateManager = () => {
  connection.query('SELECT * FROM employee', (err, res) => {
    if (err) throw (err);
    const employeeChoices = res.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }
    })
    connection.query('SELECT * FROM employee', (err, res) => {
      if (err) throw (err);
      const managerChoices = res.map((manager) => {
        return {
          name: `${manager.first_name} ${manager.last_name}`,
          value: manager.id
        }
      })
      inquirer
        .prompt([
          {
            name: 'employee',
            type: 'list',
            message: "Which Employee's manager would you like to update?",
            choices: employeeChoices
          },
          {
            name: 'manager',
            type: 'list',
            message: "Who is their new manager?",
            choices: managerChoices
          },
        ]).then((answer => {
              const query1 = `
              UPDATE employee
              SET manager_id = ${answer.manager}
              WHERE id=${answer.employee};`
              connection.query(query1, (err, res) => {
                if (err) throw err
                query2=`SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, coalesce(CONCAT(manager.first_name, " ", manager.last_name), 'None')  AS Manager_Name
                from employee
                left join role 
                on employee.role_id = role.id
                left join department 
                on role.department_id = department.id
                left join employee manager
                on manager.id = employee.manager_id
                order by employee.id;`
                connection.query(query2, (err, res) => {
                  if (err) throw err
                  console.table(res)
                  console.log(`Employee's manager has been updated!`)
                  whatNow();
                })
              })

        }))
      })
  })
}


deleteRole=()=>{
  roleQuery= `SELECT id, title, salary
  FROM employeedb.role;`
  connection.query(roleQuery, (err, res) => {
    if (err) throw (err);
    console.log('Role Table:')
    console.table(res);
    const roleChoices = res.map((role) => {
      return {
        name: role.title,
        value: role.id
      }
    })
    inquirer
    .prompt([
      {
        name: 'role',
        type: 'list',
        message: `Which role would you like to delete? \n WARNING: THIS CANNOT BE UNDONE!`,
        choices: roleChoices
      }
    ]).then((answer => {
      const deleteQuery = `DELETE FROM role WHERE id=${answer.role}`
      connection.query(deleteQuery, (err, res) => {
        if (err) throw err
          console.log(`\nRole has been deleted!`)
          viewRoles();
      })
    
}))
  })
}

deleteDepartment=()=>{
  deptQuery= `SELECT * FROM employeedb.department;`
  connection.query(deptQuery, (err, res) => {
    if (err) throw (err);
    console.log('Departments Table:')
    console.table(res);
    const deptChoices = res.map((department) => {
      return {
        name: department.department_name,
        value: department.id
      }
    })
    inquirer
    .prompt([
      {
        name: 'department',
        type: 'list',
        message: `Which department would you like to delete? \n WARNING: THIS CANNOT BE UNDONE!`,
        choices: deptChoices
      }
    ]).then((answer => {
      const deleteQuery = `DELETE FROM department WHERE id=${answer.department}`
      connection.query(deleteQuery, (err, res) => {
        if (err) throw err
          console.log(`\nDepartment has been deleted!`)
          viewDepartments();
      })
    
}))
  })
}

deleteEmployee=()=>{
  employeeQuery= `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, coalesce(CONCAT(manager.first_name, " ", manager.last_name), 'None')  AS Manager_Name
  from employee
  left join role 
  on employee.role_id = role.id
  left join department 
  on role.department_id = department.id
  left join employee manager
  on manager.id = employee.manager_id
  order by employee.id;`
  connection.query(employeeQuery, (err, res) => {
    if (err) throw (err);
    console.table(res);
    const employeeChoices = res.map((employee) => {
      return {
        name: `${employee.first_name} ${employee.last_name}`,
        value: employee.id
      }
    })
    inquirer
    .prompt([
      {
        name: 'employee',
        type: 'list',
        message: "Which employee would you like to delete? WARNING: This cannot be undone.",
        choices: employeeChoices
      }
    ]).then((answer => {
      const deleteQuery = `DELETE FROM employee WHERE id=${answer.employee}`
      connection.query(deleteQuery, (err, res) => {
        if (err) throw err
          console.log(`\nEmployee has been deleted!`)
          viewAllEmp();
        
      })
    
}))
  })
}





//Function to display all employees along with their Title, Salary, Department, and Manager_Name 
const viewAllEmp = () => {
  console.log(`\n`)
  console.log('-----------------------------------------ALL CURRENT EMPLOYEES----------------------------------------')
  const query = `SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS Employee_Name, role.title AS Title, role.salary AS Salary, department.department_name AS Department, coalesce(CONCAT(manager.first_name, " ", manager.last_name), 'None')  AS Manager_Name
  from employee
  left join role 
  on employee.role_id = role.id
  left join department 
  on role.department_id = department.id
  left join employee manager
  on manager.id = employee.manager_id
  order by employee.id;`
  connection.query(query, (err, data) => {
      if (err) throw err
      console.table(data)
      console.log('\n')
      whatNow();
  })
}

//Function that displays all current Departments
const viewDepartments = () => {
  console.log(`\n`)
  console.log('-------------ALL DEPARTMENTS------------')
  const query = `SELECT * FROM employeedb.department;`
  connection.query(query, (err, data) => {
      if (err) throw err
      console.table(data)
      console.log(`\n`)
      whatNow();
  })
}

//Function that displays all current roles
const viewRoles = () => {
  console.log(`\n`)
  console.log('-------------ALL ROLES------------')
  const query = `SELECT * FROM employeedb.role;`
  connection.query(query, (err, data) => {
      if (err) throw err
      console.table(data)
      console.log(`\n`)
      whatNow();
  })
}


//displays all departments and calls chooseDepartment() function, passing in all departments
const viewByDepartment = () => {
  const query = `SELECT * FROM department`
  connection.query(query, (err, data) => {
    if (err) throw err
    const allDepartments = data.map(department => {
      return {
        name: department.department_name,
        value: department.id
      }
    })
    allDepartments.push("None")
    console.table(data)
    console.log('\n')
    chooseDepartment(allDepartments)
  })
}

//Helper function for viewByDepartment() with an inquirer prompt that allows user to select department. Takes in array of all current departments as an argument
chooseDepartment=(allDepartments)=>{
  inquirer
  .prompt([
    {
      name: 'department',
      type: 'list',
      message: 'Choose Department',
      choices: allDepartments
    }
  ]).then(answer => {
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.department_name, coalesce(CONCAT(manager.first_name, " ", manager.last_name), 'None')  AS Manager_Name
    from employee
    left join role 
    on employee.role_id = role.id
    left join department 
    on role.department_id = department.id
    left join employee manager
    on manager.id = employee.manager_id
    where department_id = '${answer.department}'
    order by employee.id;`
    connection.query(query, (err, data) => {
      if (err) throw err
      console.table(data)
      console.log('\n')
      whatNow();
    })
  })
}

//Function that first queries for all employees that are managers, then allows user to select a manager and view all their subordinates
viewByManager=()=>{
    const query = 
    `SELECT employee.id, first_name, last_name, role.title AS role
    FROM employee 
    left join role 
    on employee.role_id = role.id
    WHERE (employee.id IN (SELECT manager_id FROM employee));`
    connection.query(query, (err, res) => {
      if (err) throw (err);
      const managerChoices = res.map((manager) => {
        return {
          name: `${manager.first_name} ${manager.last_name} (${manager.role})`,
          value: manager.id
        }
      })
      inquirer
        .prompt([
          {
            name: 'manager',
            type: 'list',
            message: "Select a manager",
            choices: managerChoices
          },
        ]).then((answer => {
              const query = `
              SELECT  CONCAT(manager.first_name, " ", manager.last_name)  AS Manager_Name, employee.manager_id AS Manager_ID,CONCAT(employee.first_name, " ", employee.last_name) AS Subordinate_Name, employee.id AS Subordinate_ID, role.title AS Subordinate_Role
              from employee
              left join role 
              on employee.role_id = role.id
              left join department 
              on role.department_id = department.id
              left join employee manager
              on manager.id = employee.manager_id
              where manager.id=${answer.manager} 
              order by employee.id;`
              connection.query(query, (err, res) => {
                if (err) throw err
                console.table(res)
                whatNow();
              })
        }))
      })
}

//Function that displays the sum of all employee salaries in a chosen department
const departmentBudget = () => {
  const query = `SELECT * FROM department`
  connection.query(query, (err, data) => {
    if (err) throw err
    const allDepartments = data.map(department => {
      return {
        name: department.department_name,
        value: department.id
      }
    })
    console.table(data)
    console.log('\n')
    inquirer
    .prompt([
      {
        name: 'department',
        type: 'list',
        message: "Select a department",
        choices: allDepartments
      },
    ]).then((answer => {
          const query = `
          SELECT SUM(salary) Department_Budget FROM role WHERE department_id=${answer.department};`
          connection.query(query, (err, res) => {
            if (err) throw err
            console.table(res)
            whatNow();
          })
    }))
  })
}

//Function that prompts user on whether they want to return to the main menu or exit after an action.
whatNow = () =>{
  inquirer
  .prompt([
    {
      name:'whatNow',
      type:'list',
      message:'What would you like to do now?',
      choices: ['Return to Main Menu','Exit']
    }
  ])
  .then(answer=>{
    if(answer.whatNow=='Return to Main Menu'){
      mainMenu();
    } else {
      console.log(exitAscii)
      connection.end();
    }
  })
}

connection.connect((err) => {
    if (err) throw err;
    console.log(introAscii)
    console.log("  Hello!")
    mainMenu();
    // updateSalary();
  });
