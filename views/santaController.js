const fs = require("fs");
const path = require("path");
const excelToCsv = require("../utils/excelToCsv");
const csvParser = require("../utils/csvParser");
const santaPresenter = require("../presenters/santaPresenter");
const csvWriter = require("../utils/csvWriter"); 



exports.downloadAssignments = (req, res) => {
  
    santaPresenter.getAssignments((err, assignments) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
  
      if (!assignments || assignments.length === 0) {
        return res.status(404).json({ error: "No Secret Santa assignments found" });
      }
  
      const filePath = path.join(__dirname, "../uploads/secret_santa_assignments.csv");
  
      csvWriter.writeCSV(filePath, assignments, (writeErr) => {
        if (writeErr) {
          return res.status(500).json({ error: writeErr.message });
        }
  
  
        res.download(filePath, "secret_santa_assignments.csv", (downloadErr) => {
          if (downloadErr) {
            return res.status(500).json({ error: downloadErr.message });
          }
  
          fs.unlinkSync(filePath); 
        });
      });
    });
  };
  
  
const db = require("../config/db");

exports.assignSanta = (req, res) => {
  db.query("SELECT * FROM employees", (err, employees) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!employees || employees.length === 0) {
      return res.status(400).json({ error: "No employees found" });
    }


    santaPresenter.assignSanta(employees, (assignErr, assignments) => {
      if (assignErr) {
        return res.status(500).json({ error: assignErr.message });
      }

      res.status(200).json({ status:true, message: "Secret Santa assigned successfully", assignments });
    });
  });
};

  
