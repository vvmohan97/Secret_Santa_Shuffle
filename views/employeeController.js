const employeeModel = require("../models/employeeModel");
const csvParser = require("../utils/csvParser");

exports.uploadEmployees = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const filePath = req.file.path;

  csvParser.parseCSV(filePath, (err, employees) => {
    if (err) return res.status(500).json({ error: err });


    if (!Array.isArray(employees) || employees.length === 0) {
      return res.status(400).json({ status:false, error: "Invalid employees data" });
    }

    employeeModel.addEmployees(employees, (dbErr, result) => {
      if (dbErr) return res.status(500).json({ error: dbErr.message });

      res.status(200).json({ status:true, message: "Employees Uploaded Successfully", result });
    });
  });
};
