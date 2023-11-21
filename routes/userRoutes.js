const express = require("express");
const {
  registerUser,
  getCurrentUser,
  loginUser,
  updateUser,
  getAllUsers,
} = require("../controllers/userController");
const validationToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validationToken, getCurrentUser);
router.put("/update/:id", updateUser);

module.exports = router;
