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
        console.table(res);
        startSearch();
      })
}

function viewDepartments(){
  var query = "SELECT * FROM department";
  connection.query(query, function (err, res) {
    console.table(res);
    startSearch();
  })
}

function viewRoles(){
  var query = "SELECT * FROM roles";
  connection.query(query, function (err, res) {
    console.table(res);
    startSearch();
  })
}

startSearch();