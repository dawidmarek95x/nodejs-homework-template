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

const authMiddleware = require("../../middlewares/auth");

router.get("/", authMiddleware, getAll);

router.get("/:contactId", getOne);

router.post("/", authMiddleware, validateCreationOrUpdate, addOne);

router.delete("/:contactId", authMiddleware, deleteOne);

router.put("/:contactId", validateCreationOrUpdate, changeData);

router.patch(
  "/:contactId/favorite",
  validateStatusUpdate,
  changeValueOfFavorite
);

module.exports = router;
