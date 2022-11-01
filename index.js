const inquirer = require("inquirer");
const mysql = require('mysql2');
const sqltbl = require("console.table");


const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL Username
      user: 'root',
      //Add MySQL Password
      password: 'password',
      database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
  );
  

const whatToDoFunction = ()=>{
    inquirer.prompt([
        {
            type: "list",
            name: "whatToDo",
            message: "What would you like to do?",
            choices: ['View all departments', 
            "View all roles", 
            "View all employees", 
            "Add a department", 
            "Add a role", 
            "Add an employee", 
            "Update an employee role",
            "Quit"]
        }
    ]).then(answers =>{
        switch (answers.whatToDo) {
            case 'View all departments':
                viewDepartment();
                break;

            case "View all roles":
                viewRoles();
                break;

            case "View all employees":
                viewEmployees();
                break;

            case "Add a department":
                addDepartment();
                break;

            //case  "Add a role":
                //addRole();
                //break;

            //case "Add an employee":
                //addEmployee();
                //break;

            //case "Update an employee role":
                //updateEmployee();
                //break;
            
            case "Quit":
                break;
        }
    })
};

//views departments
const viewDepartment= ()=>{
    db.query("SELECT * FROM departments", function (err, results){
        console.table(results);
        whatToDoFunction();
    })
};

//views roles
const viewRoles = ()=>{
    db.query("SELECT * FROM roles JOIN departments ON roles.department_id=departments.id", function(err, results){
        console.table(results);
        whatToDoFunction();
    })
};

//views all employees
const viewEmployees = ()=>{
    db.query("SELECT * FROM employees", function(err, results){
        console.table(results);
        whatToDoFunction();
    })
};

//adds another department to the table
const addDepartment = ()=>{
    inquirer.prompt([
    {
        type: "input",
        name:"departmentName",
        message:"What Department do you want to add?"
    },
    ]).then((response)=>{
        db.query("INSERT INTO DEPARTMENTS SET ?", {name: response. departmentName}, function(err, results){
            console.table(results);
            whatToDoFunction();
        })
    })
}

whatToDoFunction();


// TODO:WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// TODO:WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// TODO:WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// TODO:WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 