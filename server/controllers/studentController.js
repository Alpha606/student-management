const multer = require("multer");
const path = require("path");
const Student = require("../models/Student");

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// File filter to ensure only images are uploaded
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only images are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit for the file upload
});

// Middleware for handling file uploads as well as updating errors 
exports.upload = (req, res, next) => {
  upload.single("photograph")(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(413).json({ message: "File size exceeds the limit (5 MB)." });
      }
    } else if (err) {
      console.error("Error uploading file:", err);
      return res.status(500).json({ message: "Error uploading file" });
    }
    next();
  });
};

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err);
    res.status(500).json({ message: "Error fetching students" });
  }
};

// Get details of a specific student 
exports.getStudentDetails = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (err) {
    console.error("Error fetching student details:", err);
    res.status(500).json({ message: "Error fetching student details" });
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email) {
    return res.status(400).json({ message: "First Name, Last Name, and Email are required" });
  }

  const student = new Student({
    ...req.body,
    photograph: req.file ? `/uploads/${req.file.filename}` : "",
  });

  try {
    const newStudent = await student.save();
    res.status(201).json(newStudent);
  } catch (err) {
    console.error("Error creating student:", err);
    res.status(400).json({ message: "Error creating student" });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    
    Object.assign(student, req.body);
    if (req.file) {
      student.photograph = `/uploads/${req.file.filename}`;
    }
    await student.save();
    res.json(student);
  } catch (err) {
    console.error("Error updating student:", err);
    res.status(400).json({ message: "Error updating student" });
  }
};

// Deactivate a student
exports.deactivateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    student.active = false;
    await student.save();
    res.json({ message: "Student deactivated" });
  } catch (err) {
    console.error("Error deactivating student:", err);
    res.status(500).json({ message: "Error deactivating student" });
  }
};
