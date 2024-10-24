const express = require("express");
const { getAllUser, signUp, logIn } = require("../controller/UserController");

const router = express.Router();

router.get("/", getAllUser); // Get all users
router.post("/signup", signUp); // Sign up a new user
router.post("/login", logIn); // Log in an existing user

module.exports = router;
