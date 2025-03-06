const db = require("../config/db");


// Function to shuffle an array randomly
// const shuffleArray = (array) => {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
//   console.log("------shuffle",shuffleArray)
//   return array;
// };
const shuffleArray = (array) => {
    const clonedArray = [...array];  
    for (let i = clonedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [clonedArray[i], clonedArray[j]] = [clonedArray[j], clonedArray[i]];
    }
    console.log("------shuffle", clonedArray);
    return clonedArray;
  };


exports.getAssignments = (callback) => {
  const query = `
    SELECT 
      e1.name AS employee_name, 
      e1.email AS employee_email, 
      e2.name AS secret_child_name, 
      e2.email AS secret_child_email
    FROM assignments 
    JOIN employees e1 ON assignments.employee_id = e1.id
    JOIN employees e2 ON assignments.secret_child_id = e2.id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      return callback(err);
    }

    if (results.length === 0) {
      return callback(new Error("No Secret Santa assignments found"));
    }

    callback(null, results);
  });
};



exports.assignSanta = (employees, callback) => {
  if (!Array.isArray(employees) || employees.length === 0) {
    return callback(new Error("No valid employees found"));
  }


  employees.forEach((emp, index) => {
  });

  let employeeIds = employees.map(emp => emp.id).filter(id => id !== undefined);
  if (employeeIds.length === 0) {
    return callback(new Error("Invalid employee data: missing IDs"));
  }

  let shuffledIds = shuffleArray([...employeeIds]);


  let assignments = [];

  for (let i = 0; i < employeeIds.length; i++) {
    let employeeId = employeeIds[i];
    let secretChildId = shuffledIds[i];

    if (employeeId === secretChildId) {
      return callback(new Error("Assignment not possible, self-assignment detected"));
    }

    assignments.push([employeeId, secretChildId]);
  }


  const query = "INSERT INTO assignments (employee_id, secret_child_id) VALUES ?";
  db.query(query, [assignments], (err, result) => {
    if (err) {
      return callback(err);
    }
    callback(null, assignments);
  });
};
