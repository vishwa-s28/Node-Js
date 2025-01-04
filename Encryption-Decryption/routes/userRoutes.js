const express = require("express");
const { addUser, getUser } = require("../controllers/user");

const router = express.Router();

// Route to add a user
router.post("/add", addUser);

// Route to get a user by ID
router.get("/:id", getUser);

module.exports = router;
