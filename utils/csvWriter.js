const createCsvWriter = require("csv-writer").createObjectCsvWriter;

exports.writeCSV = (filePath, data, callback) => {
  const csvWriter = createCsvWriter({
    path: filePath,
    header: [
      { id: "employee_name", title: "Employee_Name" },
      { id: "employee_email", title: "Employee_EmailID" },
      { id: "secret_child_name", title: "Secret_Child_Name" },
      { id: "secret_child_email", title: "Secret_Child_EmailID" }
    ]
  });

  csvWriter.writeRecords(data)
    .then(() => callback(null))
    .catch(err => callback(err));
};
