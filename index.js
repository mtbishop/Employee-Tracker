// Dependencies

const mysql = require('mysql2');
const inquirer = require('inquirer');
require('dotenv').config();
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: process.env.PASSWORD,
  database: 'employee_tracker',
});
connection.connect((err) => {
  if (err) throw err;
});

// Function for main prompt of questions
function mainQuestions() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'question',
        message: 'What do you wanna do?',
        choices: [
          'View all employees',
          'View all roles',
          'View all departments',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          'Quit program',
        ],
      },
    ])
    .then((data) => {
      if (data.question === 'View all employees') {
        viewAllEmployees();
      } else if (data.question === 'View all roles') {
        viewAllRoles();
      } else if (data.question === 'View all departments') {
        viewAllDepartments();
      } else if (data.question === 'Add a department') {
        addADepartment();
      } else if (data.question === 'Add a role') {
        addRole();
      } else if (data.question === 'Add an employee') {
        addEmployee();
      } else if (data.question === 'Update an employee role') {
        updateEmployeeRole();
      } else if (data.question === 'Quit program') {
        quit();
      }
    });
}

// Displays tables of employees
function viewAllEmployees() {
  connection
    .promise()
    .query('SELECT * FROM employee')
    .then(([data, other]) => {
      console.table(data);
      mainQuestions();
    });
}

// Displays all available roles
function viewAllRoles() {
  connection
    .promise()
    .query('SELECT * FROM role')
    .then(([data, other]) => {
      console.table(data);
      mainQuestions();
    });
}

// Displays all available departments
function viewAllDepartments() {
  connection
    .promise()
    .query('SELECT * FROM department')
    .then(([data, other]) => {
      console.table(data);
      mainQuestions();
    });
}

// Function for prompt that lets you add a department to the list of available departments
function addADepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of the department',
      },
    ])
    .then((answers) => {
      return connection
        .promise()
        .query('INSERT INTO department SET ?', answers);
    })
    .then(([data]) => {
      console.log(data);
      console.log('Department Added');
      mainQuestions();
    })
    .catch((err) => console.log(err));
}

// Function for prompt that lets you add a role to the list of available roles
function addRole() {
  const departments = [];
  connection
    .promise()
    .query('SELECT * FROM department')
    .then(([data, other]) => {
      for (i = 0; i < data.length; i++) {
        var choice = {
          name: data[i].name,
          value: data[i].id,
        };
        departments.push(choice);
      }
      return inquirer.prompt([
        {
          type: 'input',
          name: 'title',
          message: 'What is the roles title?',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'What is the roles salary?',
        },
        {
          type: 'list',
          name: 'department_id',
          message: 'What is the department for this role?',
          choices: departments,
        },
      ]);
    })
    .then((answers) => {
      return connection.promise().query('INSERT INTO role SET ?', answers);
    })
    .then(() => {
      console.log('Role Added');
      mainQuestions();
    })
    .catch((err) => console.log(err));
}

// Function for prompt that lets you add an employee to the available list of employees
function addEmployee() {
  const employees = [];
  connection
    .promise()
    .query('SELECT * FROM employee')
    .then(([data, other]) => {
      for (i = 0; i < data.length; i++) {
        var choice = {
          name: data[i].first_name + ' ' + data[i].last_name,
          value: data[i].id,
          role: data[i].role_name,
          mId: data[i].manager_name,
        };
        employees.push(choice);
      }
      return [data, other];
    })
    .then(() => {
      return inquirer.prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'What is the employees first name?',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'What is the employees last name?',
        },
        {
          type: 'list',
          name: 'role_name',
          message: 'What is this employees role?',
          choices: [
            'Sales Lead',
            'Salesperson',
            'Lead Engineer',
            'Software Engineer',
            'Account Manager',
            'Accountant',
            'Legal Team Lead',
          ],
        },
        {
          type: 'list',
          name: 'manager_name',
          message: 'Who is this employees manager?',
          choices: employees,
        },
      ]);
    })
    .then((answers) => {
      console.log(answers);
      return connection.promise().query('INSERT INTO employee SET ?', answers);
    })
    .then(() => {
      console.log('Employee Added');
      mainQuestions();
    })
    .catch((err) => console.log(err));
}

// Function that allows you to update the role of an employee from the available employee list
function updateEmployeeRole() {
  // Array of employees imported from employee table
  const employees = [];
  connection
    .promise()
    .query('SELECT * FROM employee')
    .then(([data]) => {
      for (i = 0; i < data.length; i++) {
        var choice = {
          name: data[i].first_name + ' ' + data[i].last_name,
          value: data[i].id,
        };
        employees.push(choice);
      }
    })
    .then(() => {
      return inquirer.prompt([
        {
          type: 'list',
          name: 'first_name',
          message: 'Which employee would you like to update?',
          choices: employees,
        },
      ]);
    })
    .then(async (answer) => {
      const rolesArray = await connection
        .promise()
        .query('SELECT DISTINCT title FROM role')
        .then(([data]) => {
          const roles = [];
          for (i = 0; i < data.length; i++) {
            roles.push(data[i].title);
          }
          return roles;
        });
      return [rolesArray, answer];
    })
    .then(([roles, answer1]) => {
      return inquirer
        .prompt([
          {
            type: 'list',
            name: 'role_name',
            message: 'Which role would you like to update this employee to?',
            choices: roles,
          },
        ])
        .then((answer2) => {
          connection.query(
            'UPDATE employee SET role_name = ? WHERE id = ?',
            [answer2.role_name, answer1.first_name],
            (err, res) => {
              if (err) throw err;
              else console.log('Role has been successfully changed');
              mainQuestions();
            }
          );
        });
    });
}

// Function that terminates the prompt of main questions
function quit() {
  connection.end();
  console.log('Thank you for using the employee tracker');
  process.exit();
}

// Initiates first prompt of questions
mainQuestions();
