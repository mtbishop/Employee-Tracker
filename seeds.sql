-- Auto populate employees table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Jeff', 'Berg', 5, 1),
('Harold', 'Smith', 2, 2),
('Johnson', 'Johnson', 1, 3),
('Beck', 'Nerve', 7, NULL );
-- Auto populate roll table
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 50000, 1), 
('Salesperson', 35000, 1), 
('Lead Engineer', 110000, 2),
 ('Software Engineer', 90000, 2), 
 ('Account Manager', 70000, 3), 
 ('Accountant', 40000, 3), 
 ('Legal Team Lead', 85000, 4);