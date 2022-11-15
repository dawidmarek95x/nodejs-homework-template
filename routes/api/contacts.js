const express = require("express");
const router = express.Router();
const {
  getAll,
  getOne,
  addOne,
  deleteOne,
  changeData,
  changeValueOfFavorite,
} = require("../../controllers/contactsCtrl");

const {
  validateCreationOrUpdate,
  validateStatusUpdate,
} = require("../../middlewares/contactsValidation");

const authenticateUser = require("../../middlewares/authenticateUser");

router.get("/", authenticateUser, getAll);

router.get("/:contactId", getOne);

router.post("/", authenticateUser, validateCreationOrUpdate, addOne);

router.delete("/:contactId", authenticateUser, deleteOne);

router.put("/:contactId", validateCreationOrUpdate, changeData);

router.patch(
  "/:contactId/favorite",
  validateStatusUpdate,
  changeValueOfFavorite
);

module.exports = router;
