const inquirer = require("inquirer");
const mysql = require('mysql2');

const whatToDoFunction = ()=>{
    inquirer.prompt([
        {
            type: "list",
            name: "whatToDo",
            message: "What would you like to do?",
            choices: ['View all departments', "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
        }
    ]).then(toDoInput =>{
        const {whatToDo}= toDoInput;
        if(whatToDO === "View all departments"){
            //goes to view all departments function
        } else if(whatToDo === "View all roles"){
            //goes to view all roles function
        } else if (whatToDo === "View all employees"){
            //Goes to view all employees function
        } else if(whatToDo === "Add a department"){
            //goes to add a department function
        } else if (whatToDo === "Add a role"){
            //goes to add a role function
        }else if (whatToDo ==="Add an employee"){
            //goes to add an employee function
        }else{
            //goes to update an employee role function
        }
    })
}