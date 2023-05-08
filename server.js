const express = require("express");
const path = require("path");
const connectDB = require("./config/db");
const app = express();

// Connect Database
connectDB();
// Init Middleware
app.use(express.json({ extended: false }));
// Defining pictures folder static
app.use(express.static("uploads"));

// Define Routes
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/report", require("./routes/api/report"));
app.use("/api/pg", require("./routes/api/pg"));
app.use("/api/vault", require("./routes/api/vault"));
app.use("/api/sale", require("./routes/api/sale"));

//Set static folder
app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
