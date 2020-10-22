const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let team = [];

const employeeQ = [
    {
        type: "input",
        name: "name",
        message: "What is your name?",
    },
    {
        type: "input",
        name: "id",
        message: "What is your employee id?",
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",
    },
    {
        type: "list",
        name: "role",
        message: "What is your current role?",
        choices: ["Manager", "Engineer", "Intern"]
    },
 ];

const managerQ = [
    {
        type: "input",
        name: "officeNumber",
        message: "What is your office number?",
    }
];
const engineerQ = [
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username?",
    }
];
const internQ = [
    {
        type: "input",
        name: "school",
        message: "Where do you attend school?",
    }
];
const moreEmployeesQ = [
    {
        type: "confirm",
        name: "more",
        message: "Would you like to add another employee?",
    }
]

function init() {
    inquirer.prompt(employeeQ).then(function(data) {
        if (data.role === "Manager") {
            function addManager (data, managerInfo) {
            let newManager = new Manager(data.name, data.id, data.email, managerInfo.officeNumber);
            team.push(newManager);
            }
            inquirer.prompt(managerQ).then(function(managerInfo){
                addManager(data, managerInfo);
                inquirer.prompt(moreEmployeesQ).then(function(data){
                    if (data.more) {
                        init ();
                    } else {
                        writeHtml ();
                    }
                })
            });
            
        } else if (data.role === "Engineer") {
            function addEngineer (data, engineerInfo) {
                let newEngineer = new Engineer(data.name, data.id, data.email, engineerInfo.github);
                team.push(newEngineer);
            }
            inquirer.prompt(engineerQ).then(function(engineerInfo){
                addEngineer(data, engineerInfo);
                inquirer.prompt(moreEmployeesQ).then(function(data){
                    if (data.more) {
                        init ();
                    } else {
                        writeHtml ();
                    }
                })
            });
        } else if (data.role === "Intern") {
            function addIntern(data, internInfo) {
                let newIntern = new Intern(data.name, data.id, data.email, internInfo.school);
                team.push(newIntern);
            }
            inquirer.prompt(internQ).then(function(internInfo){
                addIntern(data, internInfo);
                inquirer.prompt(moreEmployeesQ).then(function(data){
                    if (data.more) {
                        init ();
                    } else {
                        writeHtml ();
                    }
                });
            });   
        }
    })
}


function writeHtml () {
    var teamHtml = render (team)
    fs.writeFileSync("./output/team.html", teamHtml, function(err) {
        console.log(err);
    });
}

init();