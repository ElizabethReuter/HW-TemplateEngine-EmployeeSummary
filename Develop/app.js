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


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


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
        type: "input",
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
        type: "input",
        name: "more",
        message: "Would you like to add another employee?",
        choices: ["Yes", "No"],
    }
]

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
function addManager (data, managerInfo) {
    let newManager = new Manager(data.name, data.id, data.email, managerInfo.officeNumber);
}
function addEngineer (data, engineerInfo) {
    let newEngineer = new Engineer(data.name, data.id, data.email, engineerInfo.github);
}
function addIntern(data, internInfo) {
    let newIntern = new Intern(data.name, data.id, data.email, internInfo.school);
}

function init() {
    // console.log('init function');
    inquirer.prompt(employeeQ).then(function(data) => {
        // console.log(response);
        if (data.role === Manager) {
            inquirer.prompt(managerQ).then(function(managerInfo){
                addManager(data, managerInfo);
            });
        } else if (data.role === Engineer) {
            inquirer.prompt(engineerQ).then(function(engineerInfo){
                addEngineer(data, engineerInfo);
            });
        } else if (data.role === Intern) {
            inquirer.prompt(internQ).then(function(internInfo){
                addIntern(data, internInfo);
            });
        }
    });
    
}

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// writeToFile("Team.html", markdown(response));



init();