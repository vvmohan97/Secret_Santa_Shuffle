const parseXLSX = (filePath, callback) => {
    try {
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0]; 
      const sheet = workbook.Sheets[sheetName];
      const data = xlsx.utils.sheet_to_json(sheet);
  
      if (!Array.isArray(data) || data.length === 0) {
        return callback("No valid employees found in XLSX.");
      }
  
      const employees = data
        .filter(row => row.name && row.email)
        .map(row => ({
          name: row.name.toString().trim(),
          email: row.email.toString().trim()
        }));
  
      callback(null, employees);
    } catch (error) {
      callback("Error processing XLSX file: " + error.message);
    }
  };
  