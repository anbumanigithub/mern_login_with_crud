const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");

const employeeRoutes = require("./routes/employees");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/loginwithmerncrudApp")
  .then(() => console.log("Database connected to MongoDB"))
  .catch((err) => console.log("Database connection error: ", err));

  
app.use("/auth", authRoutes);
app.use("/employees", employeeRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
