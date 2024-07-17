const express = require("express");
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudentById,
} = require("../controllers/studentCotroller");

//router objects
const router = express.Router();

//router
router.get("/getall", getStudents);

router.get("/get/:id", getStudentById);

router.post("/create", createStudent);

router.put("/update/:id", updateStudent);

router.delete("/delete/:id", deleteStudentById);

//GET ALL STUDENT LIST
router.get("/list", (req, res) => {
  res.json({});
});

module.exports = router;
