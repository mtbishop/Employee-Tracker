DROP DATABASE IF EXISTS employee_tracker;
CREATE DATABASE employee_tracker;
USE employee_tracker;
CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_name VARCHAR(30) NOT NULL,
  manager_name VARCHAR(30)
);

-- Auto populate employees table
INSERT INTO employee (first_name, last_name, role_name, manager_name)
VALUES ('Jeff', 'Berg', 'Account Manager', 'Beck Nerve');
INSERT INTO employee (first_name, last_name, role_name, manager_name)
VALUES ('Harold', 'Smith', 'Salesperson', 'Johnson Johnson');
INSERT INTO employee (first_name, last_name, role_name, manager_name)
VALUES ('Johnson', 'Johnson', 'Sales Lead', 'Beck Nerve');
INSERT INTO employee (first_name, last_name, role_name, manager_name)
VALUES ('Beck', 'Nerve', 'Legal Team Lead', NULL );

--Auto populate roll table
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 50000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('Salesperson', 35000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Lead Engineer', 110000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 90000, 4);
INSERT INTO role (title, salary, department_id)
VALUES ('Account Manager', 70000, 5);
INSERT INTO role (title, salary, department_id)
VALUES ('Accountant', 40000, 6);
INSERT INTO role (title, salary, department_id)
VALUES ('Legal Team Lead', 85000, 7);