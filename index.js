// TODO: Include packages needed for this application

const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown")
const fs = require("fs")

// TODO: Create an array of questions for user input
const questions = [
  {
    type: "input",
    name: "title",
    message: "Please enter the title of your project (Required).",
    validate: (titleInput) => {
      if (titleInput) {
        return true;
      } else {
        console.log("You must enter a project title to continue.");
        return false;
      }
    }
  },
  {
    type: "input",
    name: "description",
    message:
      "Please enter the description details of your desired README (Required).",
    validate: (descriptionInput) => {
      if (descriptionInput) {
        return true;
      } else {
        console.log(
          "Please take some time to describe the what/why/how of this project."
        );
        return false;
      }
    }
  },
  {
    type: "input",
    name: "instlInstrctns",
    message:
      "If your project has any installation instructions to include, please list them here.",
  },
  {
    type: "input",
    name: "contribution",
    message:
      "If you created an application or package and would like other developers to contribute it, enter any instructions of use for your application you would like potential contributers to adhere to. The Contributor Covenant is an industry standard, but you can always write your own.",
  },
  {
    type: "input",
    name: "testInstrctns",
    message:
      "Go the extra mile and write tests for your application. Then provide examples on how to run them.",
  },
  {
    type: "list",
    name: "licenseSlct",
    message: "please select a license you wish to use for this project",
    choices: [
      "Apache License 2.0",
      "GNU GPLv3",
      "GNU AGPLv3",
      "GNU LGPLv3",
      "MIT",
      "ISC",
      "Mozilla Public License 2.0",
      "Boost Software License 1.0",
      "The Unlicense",
    ],
  },
  {
    type: "input",
    name: "usgInstrctns",
    message: "Provide instructions and examples for use.",
  },
  {
  type: "input",
  name: "gitName",
  message:
    "Please provide your gitHub username.",
  },
  {
  type: "input",
  name: "email",
  message:
    "Please provide your email address.",
  },
];

const addScreenShot = (res) => {
  if (!res.sc) {
    res.sc = [];
  }
  console.log(res);
  return inquirer
    .prompt([
      {
        type: "confirm",
        name: "confirmScreenShot",
        message:
          "Would you like to add a screen shot to your README? You will be prompted for as many screen shots as you wish to add.",
        default: false,
      },
      {
        type: "input",
        name: "scrnSht",
        message:
          "Please enter the alt text and relative filepath of your screen shot in the following format:   ![alt text](/folder/name_of_file.png)",
        when: ({ confirmScreenShot }) => confirmScreenShot,
      },
    ])
    .then((screenShotInfo) => {
      if (screenShotInfo.confirmScreenShot) {
        res.sc.push(screenShotInfo.scrnSht);
        return addScreenShot(res);
      } else {
        return res;
      }
    });
};

// TODO: Create a function to write README file
function writeToFile(data) {
  console.log(data);
  fs.writeFileSync("./dist/README.md", generateMarkdown(data))
}

// TODO: Create a function to initialize app
function init() {
  inquirer
    .prompt(questions)
    .then(addScreenShot)
    .then((res) => {writeToFile(res)
    });
}

// Function call to initialize app
init();
