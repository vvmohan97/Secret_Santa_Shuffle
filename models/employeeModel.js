const db = require("../config/db"); 

exports.addEmployees = (employees, callback) => {
  if (!Array.isArray(employees) || employees.length === 0) {
    console.error("Error: employees is not an array:", employees);
    return callback(new Error("Invalid employees data"));
  }

  const values = employees.map(emp => [emp.name, emp.email]);

  const query = "INSERT INTO employees (name, email) VALUES ?";

  db.query(query, [values], (err, result) => {
    if (err) {
      console.error("Database Insert Error:", err);
      return callback(err);
    }
    console.log("Employees inserted successfully!");
    callback(null, result);
  });
};
