USE employee_db;

INSERT INTO department (name) VALUES
("Sales"),
("Human Resources"),
("IT"),
("Nursing");

INSERT INTO roles (title, salary, department_id) VALUES
("Sales Rep", 35000, 1),
("Sales Rep II", 50000, 1),
("HR Rep I", 50000, 2),
("HR Rep II", 70000, 2),
("Developer I", 60000, 3),
("Developer II", 85000, 3),
("LPN", 40000, 4),
("RN", 65000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
("Matt", "Stewart", 1, null),
("Lauren", "Phellps", 2, 1),
("Walker", "Parks", 3, null),
("Heather", "Brady", 4, 3),
("Pete", "Graham", 5, null),
("Wendy", "Lance", 6, 5),
("Brandy", "Mcgrahm", 7, null),
("Penny", "Walker", 8, 7),
("Tim", "Jones", 7, null),
("Pam", "Smith", 8, null);