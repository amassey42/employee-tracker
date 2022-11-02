const inquirer = require("inquirer");
const mysql = require('mysql2');
const sqltbl = require("console.table");


//connection to mysql
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

            case  "Add a role":
                addRole();
                break;

            case "Add an employee":
                addEmployee();
                break;

            case "Update an employee role":
                updateEmployee();
                break;
            
            //ends connection to terminal
            case "Quit":
                db.end()
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
    db.query("SELECT roles.title AS title, roles.id AS id, roles.salary AS salary, departments.name AS department FROM roles JOIN departments ON roles.department_id = departments.id ", function(err, results){
        if (err) {
            throw err
        } else {
        console.table(results);
        whatToDoFunction();
        }
    })
};

//views all employees
const viewEmployees = ()=>{
    db.query("SELECT employees.id AS id, employees.first_name AS first, employees.last_name AS last, roles.title AS title, roles.department_id AS department_id, roles.salary AS salary, employees.manager_id AS Manager FROM employees JOIN roles ON employees.role_id = roles.id", function(err, results){
        if (err) {
            throw err
        } else {
            console.table(results);
            whatToDoFunction();
        }
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
        db.query("INSERT INTO DEPARTMENTS SET ?", {name: response.departmentName}, function(err, results){
            console.table(results);
            whatToDoFunction();
        })
    })
}

//adds a new role
const addRole = ()=>{
    db.query('SELECT * FROM departments',( err, results) => {
        // console.log(results)
        const choices = results.map((department)=>{
            return {name: department.name, value: department.id};
        })
        // console.log(choices)
        inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "Enter new Role name."
        },
        {
            type: "input",
            name: "salary",
            message: "Enter Salary for role."
        },
        {
            type: "list",
            name: "department_id",
            message: "Choose the Department ID for this role.",
            choices: choices
        },
    ]).then(answer=>{
        db.query('INSERT INTO roles SET ?', {
            title:answer.title,
            salary:answer.salary,
            department_id:answer.department_id
        })
        if (err) {
            throw err
        } 
            console.table(results);
           
        whatToDoFunction();
    })
})
   
}

const addEmployee= ()=>{
    db.query('SELECT * FROM roles',( err, results) => {
        // console.log(results)
        let roleChoices = results.map((role)=>{
            return {name: role.title, value: role.id,}
        })
        // console.log(roleChoices)
    db.query('SELECT * FROM employees',( err, results) => {
        let managerChoices = results.map((manager)=>{
            return {name: `${manager.first_name} ${manager.last_name}`, value: manager.id}
        })
            // console.log(managerChoices)
    inquirer.prompt([
        {
            type:"input",
            name:"first_name",
            message: "What is your Employees First name?"
        },
        {
            type:"input",
            name:"last_name",
            message: "What is your Employees Last name?"
        },
        {
            type:"list",
            name:"roleSelect",
            message: "What is your Employees Role?",
            choices: roleChoices
        },
        {
            type:"list",
            name:"mananger_id",
            message:"Who is your Employees Manager?",
            choices: managerChoices
        }
    ]).then(answer =>{
        db.query('INSERT INTO employees SET ?', {
            first_name:answer.first_name,
            last_name: answer.last_name,
            role_id:answer.roleSelect,
            manager_id:answer.manager_id
        })
        whatToDoFunction();
        })
    })
})
}


const updateEmployee = ()=>{
    //employees
    db.query('SELECT * FROM employees',( err, results) => {
        console.log(results)
        const employeeChoices = results.map((employee)=>{
            return employee.first_name
        })
        console.log(employeeChoices)
        db.query('SELECT * FROM roles',( err, results) => {
            // console.log(results)
            let roleChoices = results.map((role)=>{
                return {name: role.title, value: role.id,}
            })
    //roles db.query
        console.log(roleChoices)
        inquirer.prompt([
            {
                type: "list",
                name:"employeeUpdate",
                // ["john", "steve"]
                message:'Select an employee to update.',
                choices: employeeChoices
            },
            {
                type: "list",
                name:"roleUpdate",
                // ["john", "steve"]
                message:'Select what role the Employee is changing to.',
                choices: roleChoices
            },
        ]).then(answer =>{
            db.query('INSERT INTO roles SET ?', {
                first_name:answer.employeeUpdate,
                role_id:answer.roleUpdate,
            })
            whatToDoFunction();
        })
    })
})
}
//WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 


//calls main function
whatToDoFunction();
