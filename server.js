const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv");
const colors = require("colors");
const mySqlPool = require("./config/db");

//config
dotenv.config({ path: "./Environment/.env" });

//rest object
const app = express();

//middleware
app.use(express.json()); //this will recieve json from request
app.use(morgan("dev")); // this is for tracking the request
//routes
app.use("/api/v1", require("./routes/router"));

//port
const PORT = process.env.PORT || 8000;

//lister
mySqlPool
  .query("SELECT 1")
  .then(() => {
    // check the db connction
    console.log("db connected sucessfully");
    app.listen(PORT, () => {
      console.log(`Server is running ${process.env.PORT} `.bgMagenta.white);
    });
  })
  .catch((error) => {
    console.log(error);
  });
