const express = require("express");
const router = express.Router();
const studentController = require("../controllers/studentController");

router.get("/", studentController.getAllStudents);
router.get("/:id", studentController.getStudentDetails);
router.post("/", studentController.upload, studentController.createStudent);
router.put("/:id", studentController.upload, studentController.updateStudent);
router.put("/:id/deactivate", studentController.deactivateStudent);

module.exports = router;
