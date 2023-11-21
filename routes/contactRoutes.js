const express = require("express");
const {
  getContact,
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validationToken = require("../middleware/validateTokenHandler");
const router = express.Router();

// Routes
router.use(validationToken)
router.route("/").get(getContacts).post(createContact);

router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
