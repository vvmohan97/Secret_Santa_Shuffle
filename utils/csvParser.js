const fs = require("fs");
const csvParser = require("csv-parser");

exports.parseCSV = (filePath, callback) => {
  let employees = [];
  let rowCount = 0;

  fs.createReadStream(filePath)
    .pipe(csvParser())
    .on("headers", (headers) => {
    })
    .on("data", (row) => {
      rowCount++;

      if (!row.name || !row.email) {
        return;
      }

      employees.push({ name: row.name.trim(), email: row.email.trim() });
    })
    .on("end", () => {

      if (!Array.isArray(employees) || employees.length === 0) {
        return callback("No valid employees found");
      }

      callback(null, employees);
    })
    .on("error", (err) => {
      callback(err);
    });
};


// const parseCSV = (filePath, callback) => {
//   let employees = [];
  
//   fs.createReadStream(filePath)
//     .pipe(csvParser())
//     .on("data", (row) => {
//       if (row.name && row.email) {
//         employees.push({ name: row.name.trim(), email: row.email.trim() });
//       }
//     })
//     .on("end", () => {
//       if (employees.length === 0) {
//         return callback("No valid employees found in CSV.");
//       }
//       callback(null, employees);
//     })
//     .on("error", (err) => callback(err));
// };
