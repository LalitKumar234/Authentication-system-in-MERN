const express = require("express");
const router = express.Router();


const signupUser = require("../controllers/authentication/signupUser")
const loginUser = require('../../backend/controllers/authentication/loginUser')
const userDetails = require("../../backend/controllers/authentication/userDetails")
const updateUserDetails = require("../../backend/controllers/authentication/updateUserDetails")
const auth = require("../middlewares/auth");
const { validateSignupData } = require("../middlewares/userValidation");

router.post("/signup", validateSignupData, signupUser);
router.post("/login", loginUser);
router.get("/me", auth, userDetails);
router.put("/updatedetails/:id", auth, updateUserDetails);

module.exports = router;
