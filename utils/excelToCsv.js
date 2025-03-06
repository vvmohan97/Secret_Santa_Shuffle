const xlsx = require("xlsx");
const fs = require("fs");

exports.convertExcelToCsv = (filePath, outputFilePath, callback) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; 
    const csvData = xlsx.utils.sheet_to_csv(workbook.Sheets[sheetName]);

    fs.writeFileSync(outputFilePath, csvData);
    callback(null, outputFilePath);
  } catch (error) {
    callback(error, null);
  }
};
