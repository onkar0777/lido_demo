const express = require("express");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));

// Constants
const SECTION_LIMIT = 60;
const CLASS_LIMIT = 60;
const NO_OF_SECTIONS = 5;
const OPTIMUM_SECTION_LIMIT = Math.floor(CLASS_LIMIT / NO_OF_SECTIONS);
const studentIds = [];
const school = {
  1: { A: [], B: [], C: [], D: [], E: [], total: 0 },
  2: { A: [], B: [], C: [], D: [], E: [], total: 0 },
  3: { A: [], B: [], C: [], D: [], E: [], total: 0 },
  4: { A: [], B: [], C: [], D: [], E: [], total: 0 },
  5: { A: [], B: [], C: [], D: [], E: [], total: 0 },
  6: { A: [], B: [], C: [], D: [], E: [], total: 0 },
  7: { A: [], B: [], C: [], D: [], E: [], total: 0 },
  8: { A: [], B: [], C: [], D: [], E: [], total: 0 },
  9: { A: [], B: [], C: [], D: [], E: [], total: 0 },
  10: { A: [], B: [], C: [], D: [], E: [], total: 0 },
  11: { A: [], B: [], C: [], D: [], E: [], total: 0 },
  12: { A: [], B: [], C: [], D: [], E: [], total: 0 }
};

// Routes
app.get("/", (req, res) => {
  res.send("Hit appropriate route");
});

app.get("/class_data", (req, res) => {
  res.send(school);
});

app.post("/add_student", (req, res) => {
  console.log(req.body);
  if (validateInputs(req.body)) {
    const student = { id: req.body.studentId, data: req.body.student };
    const resMsg = addStudentsToClass(
      student,
      parseInt(req.body.class),
      req.body.section
    );
    res.send(resMsg);
  } else {
    res.send("Invalid Inputs");
  }
});

// Server Starts Listening
app.listen("3000", () => {
  console.log("Server listening");
});

// Business / Helper Functions
function validateInputs(inputBody) {
  if (inputBody.studentId && inputBody.class && inputBody.student) {
    if (!school.hasOwnProperty(inputBody.class)) {
      return false;
    } else if (
      inputBody.section &&
      !school[inputBody.class].hasOwnProperty(inputBody.section)
    ) {
      return false;
    } else {
      return true;
    }
  }
  return false;
}

function addStudentsToClass(student, schoolClass, section) {
  if (studentIds.indexOf(student.id) >= 0) {
    return "Student already added to class";
  } else if (school[schoolClass]["total"] < CLASS_LIMIT) {
    if (section) {
      if (school[schoolClass][section].length < SECTION_LIMIT) {
        school[schoolClass][section].push(student);
        school[schoolClass].total++;
        studentIds.push(student.id);
        return `Added student to class ${schoolClass} in ${section}`;
      } else {
        return `Class ${schoolClass}, section ${section} is full. Try another section`;
      }
    } else {
      school[schoolClass].total++;
      studentIds.push(student.id);
      if (school[schoolClass].A.length < OPTIMUM_SECTION_LIMIT) {
        school[schoolClass].A.push(student);
        return `Added student to class ${schoolClass} in A`;
      } else if (school[schoolClass].B.length < OPTIMUM_SECTION_LIMIT) {
        school[schoolClass].B.push(student);
        return `Added student to class ${schoolClass} in B`;
      } else if (school[schoolClass].C.length < OPTIMUM_SECTION_LIMIT) {
        school[schoolClass].C.push(student);
        return `Added student to class ${schoolClass} in C`;
      } else if (school[schoolClass].D.length < OPTIMUM_SECTION_LIMIT) {
        school[schoolClass].D.push(student);
        return `Added student to class ${schoolClass} in D`;
      } else if (school[schoolClass].E.length < OPTIMUM_SECTION_LIMIT) {
        school[schoolClass].E.push(student);
        return `Added student to class ${schoolClass} in E`;
      }
    }
  } else {
    return `Class ${schoolClass} is Full`;
  }
}
