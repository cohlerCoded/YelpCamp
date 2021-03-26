const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const {
  index,
  renderNewForm,
  createNewCampground,
  renderDetails,
  renderEditForm,
  editCampground,
  deleteCampground,
} = require("../controllers/campgrounds");
const { validateCampground, isLoggedIn, isAuthor } = require("../middleware");

router.get("/", catchAsync(index));

router.get("/new", isLoggedIn, renderNewForm);

router.post(
  "/",
  isLoggedIn,
  validateCampground,
  catchAsync(createNewCampground)
);

router.get("/:id", catchAsync(renderDetails));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(renderEditForm));

router.put(
  "/:id",
  isLoggedIn,
  isAuthor,
  validateCampground,
  catchAsync(editCampground)
);

router.delete("/:id", isLoggedIn, isAuthor, catchAsync(deleteCampground));

module.exports = router;
