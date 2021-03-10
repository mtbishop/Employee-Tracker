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
          // 'View all employees by department',
          // 'View all employees by selected manager',
          'Add a department',
          'Add a role',
          'Add an employee',
          'Update an employee role',
          // 'See total annual payroll',
          'Quit program',
        ],
      },
    ])
    .then((data) => {
      console.log();
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
      }
    });
}

function viewAllEmployees() {
  connection
    .promise()
    .query('SELECT * FROM employee')
    .then(([data, other]) => {
      console.table(data);
      mainQuestions();
    });
}
function viewAllRoles() {
  connection
    .promise()
    .query('SELECT * FROM role')
    .then(([data, other]) => {
      console.table(data);
      mainQuestions();
    });
}
function viewAllDepartments() {
  connection
    .promise()
    .query('SELECT * FROM department')
    .then(([data, other]) => {
      console.table(data);
      mainQuestions();
    });
}
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
      console.log(answers);
      return connection.promise().query('INSERT INTO role SET ?', answers);
    })
    .then(() => {
      console.log('Role Added');
      mainQuestions();
    })
    .catch((err) => console.log(err));
}

function addEmployee() {
  const departments = [];
  connection
    .promise()
    .query('SELECT * FROM department')
    .then(([data, other]) => {
      for (i = 0; i < data.length; i++) {
        var choice = {
          name: data[i].first_name,
          last: data[i].last_name,
          value: data[i].id,
        };
        departments.push(choice);
      }
      return connection.promise().query('SELECT * FROM department');
    })
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
      console.log(answers);
      return connection.promise().query('INSERT INTO role SET ?', answers);
    })
    .then(() => {
      console.log('Role Added');
      mainQuestions();
    })
    .catch((err) => console.log(err));
}

mainQuestions();
