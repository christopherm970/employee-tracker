const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
});

function startSearch() {
  inquirer
  .prompt({
      type: "rawlist",
      name: "qList",
      message: "What would like to do within your employee list?",
      choices: [
        "View all employees",
        "View all departments",
        "View all roles",
        "Add a department",
        "Add an employee",
        "Add a role",
        "Update an employee's role"
      ]
    })
    .then(function(response) {
      switch(response.qList){
      case "View all employees":
        viewEmployee();
        break;
      
      case "View all departments":
        viewDepartments();
        break;

      case "View all roles":
        viewRoles();
        break;

      case "Add a department":
        addDepartment();
        break;
      
      case "Add an employee":
        addEmployee();
        break;

      case "Add a role":
        addRole();
        break;

      case "Update an employee's role":
        updateRole();
        break;
      }
    });
}

function viewEmployee(){
  var query = "SELECT * FROM employee";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startSearch();
  })
}

function viewDepartments(){
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startSearch();
  })
}

function viewRoles(){
  var query = "SELECT * FROM roles";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    startSearch();
  })
}

function addDepartment(){
  var query = "INSERT INTO department (name) VALUES (?)"
  inquirer
    .prompt([{
      name: "department",
      type: "input",
      message: "What is the name of your new department"
    }]).then(function(res){
      const departName = [res.department]
      console.log(departName);
      connection.query(query, departName, function(err,res){
        if (err) throw err;
        console.log("Department has been created.");
        startSearch();
      })
    })
}

function addEmployee(){
  var query = "INSERT INTO employee (first_name, last_name, role_id) VALUES(?, ?, ?)"
  inquirer
  .prompt([{
    name: "firstName",
    type: "input",
    message: "What is the employee's first name?"
  },
  {
    name: "lastName",
    type: "input",
    message: "What is the employee's last name?"
  },
  {
    name: "role",
    type: "input",
    message:"What is the employee's role ID?"
  }])
  .then(function(res){
    // var employee = res.firstName, res.lastName, res.role[]
    var employee = [res.firstName, res.lastName, res.role];
    console.log(employee);
    connection.query(query, employee, function(err, res){
      if (err) throw err;
      console.log("Added new employee");
      startSearch();
    })
  })
}

startSearch();