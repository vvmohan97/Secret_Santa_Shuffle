const express = require("express");
const { uploadEmployees } = require("../views/employeeController"); 
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), uploadEmployees); 

module.exports = router;
