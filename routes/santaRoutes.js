const express = require("express");
const { assignSanta, downloadAssignments } = require("../views/santaController"); 
const multer = require("multer");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/assign", upload.single("file"), assignSanta);
router.get("/download", downloadAssignments); 

module.exports = router;

