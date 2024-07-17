const db = require("../config/db");

//Get all student list
const getStudents = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM STUDENT_INFO");
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "No data found",
      });
    }
    res.status(200).send({
      success: true,
      message: "All student records",
      totalStudent: data[0].length,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get all student API",
      error,
    });
  }
};

//Get student by Id
const getStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid id",
      });
    }
    //const data = await db.query(`SELECT * FROM STUDENT_INFO WHERE ID =` + [studentId]);
    const data = await db.query(`SELECT * FROM STUDENT_INFO WHERE ID=?`, [
      studentId,
    ]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "no data found",
      });
    }
    res.status(200).send({
      success: true,
      data: data[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in get student by Id API",
      error,
    });
  }
};

//Create student
const createStudent = async (req, res) => {
  try {
    const { FIRST_NAME, LAST_NAME, CITY, MARKS } = req.body;
    if (!FIRST_NAME || !LAST_NAME || !CITY || !MARKS) {
      res.status(500).send({
        success: false,
        message: "Please provide the all the fields",
      });
    }

    const data = await db.query(
      `INSERT INTO STUDENT_INFO (FIRST_NAME, LAST_NAME, CITY, MARKS) VALUE(?,?,?,?)`,
      [FIRST_NAME, LAST_NAME, CITY, MARKS]
    );
    if (!data) {
      res.status(404).send({
        success: false,
        message: "Please send the proper request",
      });
    }
    res.status(201).send({
      success: true,
      message: "Record inserted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in send the data",
      error,
    });
  }
};
//Update
const updateStudent = async (req, res) => {
  try {
    const studentId = req.params.id;
    console.log("id", studentId);
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid id",
      });
    }
    const oldData = await db.query(`SELECT * FROM STUDENT_INFO WHERE ID=?`, [
      studentId,
    ]);

    const newData = { ...oldData[0][0], ...req.body };

    const data = await db.query(`UPDATE STUDENT_INFO SET ? WHERE ID =?`, [
      newData,
      studentId,
    ]);
    if (!data) {
      res.status(404).send({
        success: false,
        message: "Please send the proper request",
      });
    }
    res.status(201).send({
      success: true,
      message: "Record modified successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in send the data",
      error,
    });
  }
};
//Get student by Id
const deleteStudentById = async (req, res) => {
  try {
    const studentId = req.params.id;
    if (!studentId) {
      return res.status(404).send({
        success: false,
        message: "Invalid id",
      });
    }
    //const data = await db.query(`SELECT * FROM STUDENT_INFO WHERE ID =` + [studentId]);
    const data = await db.query(`DELETE FROM STUDENT_INFO WHERE ID=?`, [
      studentId,
    ]);
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "no data found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Record deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in get student by Id API",
      error,
    });
  }
};
module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudentById,
};
