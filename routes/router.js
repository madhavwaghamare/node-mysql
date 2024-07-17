const express = require("express");
const app = express();

const router = express.Router();

router.use((req, res, next) => {
  console.log("api request");
  next();
});

router.use("/student", require("./studentRoutes"));

router.use("/", (req, res, next) => {
  res.status(404).json({
    status: false,
    messgae: "end point is wrong, please correct it",
    errorCode: 404,
  });
});

module.exports = router;
