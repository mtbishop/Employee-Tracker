-- Auto populate employees table
INSERT INTO employee (first_name, last_name, role_name, manager_id)
VALUES ('Jeff', 'Berg', 'Account Manager', 1),
('Harold', 'Smith', 'Salesperson', 2),
('Johnson', 'Johnson', 'Sales Lead', 3),
('Beck', 'Nerve', 'Legal Team Lead', NULL );
-- Auto populate roll table
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 50000, 1), 
('Salesperson', 35000, 1), 
('Lead Engineer', 110000, 2),
 ('Software Engineer', 90000, 2), 
 ('Account Manager', 70000, 3), 
 ('Accountant', 40000, 3), 
 ('Legal Team Lead', 85000, 4);