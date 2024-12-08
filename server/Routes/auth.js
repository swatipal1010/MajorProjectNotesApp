const express = require("express");
const router = express.Router();
const authController = require("../Controllers/AuthController");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();

// Configure multer storage to store images in the 'uploads' folder
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const destinationPath = "./uploads"; // Store images in 'uploads' folder
        cb(null, destinationPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now(); // Use the current timestamp for unique file name
        cb(null, uniqueSuffix + file.originalname); // Save the file with a unique name
    },
});

// Initialize multer with storage configuration
var upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        // Check if the file is an image (JPEG, JPG, PNG)
        const fileTypes = /jpeg|jpg|png/;
        const extName = fileTypes.test(file.originalname.toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extName && mimeType) {
            return cb(null, true);
        }
        cb(new Error("Only JPEG, JPG, and PNG images are allowed"));
    }
});

// Signup route, apply multer middleware to handle file upload
router.post("/signup", upload.single("profileImage"), authController.signup);

// Login route
router.post("/login", authController.login);

module.exports = router;
