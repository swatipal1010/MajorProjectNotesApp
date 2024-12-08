const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");

const authRoutes = require("./Routes/auth");
const noteRoutes = require("./Routes/notes");

const app = express();
const PORT = 6969;

dotenv.config();
app.use(cors());
app.use(express.json());

// Log MongoDB URL
console.log("MongoDB URL: ", process.env.MONGO_URL);

try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("Connection Successful");
} catch (error) {
    console.log(error);
}

app.get("/", (req, res) => {
    res.send("Server Is Running");
});

// Static file serving for uploads folder
app.use("/uploads", express.static("uploads"));

// Use authRoutes with multer for handling image upload
app.use("/auth", authRoutes);

// Other routes
app.use("/notes", noteRoutes);

app.listen(PORT, () => {
    console.log(`Server Running on Port ${PORT}`);
});
