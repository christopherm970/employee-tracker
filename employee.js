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
        "Add",
        "View",
        "Update"
      ]
    })
    .then(function(response) {
      switch(response.qList){
      case "Add":
        handleAdd();
        break;
      
      case "View":
        handleView();
        break;

      case "Update":
        handleUpdate();
        break;
      }
    });
}

function handleView() {
  inquirer.prompt([
    {
      type: "rawlist",
      name: "viewList",
      message: "Select what you would like to view",
      choices: [
        "departments",
        "roles",
        "employees"
      ]
    }
  ]).then(function (answers) {
    if (answers.viewList === "departments") {
      var query = "SELECT * FROM department";
      connection.query(query, function (err, res) {
        console.table(res);
      })
    }
    if(answers.viewList === "roles"){
      var query = "SELECT * FROM roles";
      connection.query(query, function (err, res) {
        console.table(res);
      })
    }
    if(answers.viewList === "employees"){
      var query = "SELECT * FROM employee";
      connection.query(query, function (err, res) {
        console.table(res);
      })
    }
  })
}
startSearch();