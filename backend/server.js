const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const customerRoutes = require("./routes/customerRoutes");
const leadRoutes = require("./routes/leadRoutes");
const taskRoutes = require("./routes/taskRoutes");
const dealRoutes = require("./routes/dealsRoute");
const reportRoutes = require("./routes/reportRoutes");
const userRoutes = require("./routes/userRoutes");

const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const PORT = 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.error("MongoDB Connection Error:", error);
  });

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174"],
  credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/deals", dealRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/users", userRoutes);



app.get("/", (req, res) => {
  res.send("CRM360 Backend Server is Running!");
});

app.listen(PORT, () => {
  console.log(`CRM360 Backend Server running on http://localhost:${PORT}`);
});