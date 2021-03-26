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

router
  .route("/")
  .get(catchAsync(index))
  .post(isLoggedIn, validateCampground, catchAsync(createNewCampground));

router.get("/new", isLoggedIn, renderNewForm);

router
  .route("/:id")
  .get(catchAsync(renderDetails))
  .put(isLoggedIn, isAuthor, validateCampground, catchAsync(editCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(deleteCampground));

router.get("/:id/edit", isLoggedIn, isAuthor, catchAsync(renderEditForm));

module.exports = router;
