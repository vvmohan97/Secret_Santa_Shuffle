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
        console.log(assignments,"---->");
        
        if (writeErr) {
          return res.status(500).json({ error: writeErr.message });
        }
        res.setHeader("Content-Type", "text/csv");
        res.setHeader("Content-Disposition", `attachment; filename="Secret_Santa_Game_Result.csv"`);
        
  
        res.download(filePath, "secret_santa_assignments.csv", (downloadErr) => {
          if (downloadErr) {
            return res.status(500).json({ error: downloadErr.message });
          }
  
          fs.unlinkSync(filePath); 
        });
      });
    });
  };
  

// exports.downloadAssignments = (req, res) => {
//   santaPresenter.getAssignments((err, assignments) => {
//       if (err) {
//           return res.status(500).json({ error: err.message });
//       }

//       if (!assignments || assignments.length === 0) {
//           return res.status(404).json({ error: "No Secret Santa assignments found" });
//       }

//       // Generate a dynamic filename with timestamp
//       const date = new Date();
//       const month = date.toLocaleString("en-US", { month: "short" });
//       const year = date.getFullYear();
//       const fileName = `Secret_Santa_Game_Result_${month}-${year}.csv`;
//       const filePath = path.join(__dirname, "../uploads", fileName);

//       // Define CSV Writer
//       const csvWriter = createCsvWriter({
//           path: filePath,
//           header: [
//               { id: "employee_name", title: "Employee_Name" },
//               { id: "employee_email", title: "Employee_EmailID" },
//               { id: "secret_child_name", title: "Secret_Child_Name" },
//               { id: "secret_child_email", title: "Secret_Child_EmailID" }
//           ]
//       });

//       // Write records to CSV
//       csvWriter.writeRecords(assignments)
//           .then(() => {
//               console.log("CSV file successfully written:", filePath);

//               // Set correct headers for file download
//               res.setHeader("Content-Type", "text/csv");
//               res.setHeader("Content-Disposition", `attachment; filename="${fileName}"`);

//               // Send the file
//               res.download(filePath, fileName, (downloadErr) => {
//                   if (downloadErr) {
//                       console.error("Error downloading file:", downloadErr);
//                       return res.status(500).json({ error: downloadErr.message });
//                   }

//                   // Delete the file after sending
//                   fs.unlink(filePath, (unlinkErr) => {
//                       if (unlinkErr) {
//                           console.error("Error deleting file:", unlinkErr);
//                       }
//                   });
//               });
//           })
//           .catch((writeErr) => {
//               console.error("Error writing CSV file:", writeErr);
//               return res.status(500).json({ error: writeErr.message });
//           });
//   });
// };
  
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

  
