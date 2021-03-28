const Campground = require("../models/campground");
module.exports.index = async (req, res) => {
  const campgrounds = await Campground.find({});
  res.render("campgrounds/index", { campgrounds });
};

module.exports.renderNewForm = (req, res) => {
  res.render("campgrounds/new");
};

module.exports.createNewCampground = async (req, res, next) => {
  const campground = new Campground(req.body.campground);
  campground.author = req.user._id;
  campground.images = req.files.map((file) => ({
    url: file.path,
    filename: file.filename,
  }));
  await campground.save();
  console.log(campground);
  req.flash("success", `${campground.title} Successfully Created!`);
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.renderDetails = async (req, res) => {
  const campground = await Campground.findById(req.params.id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("author");
  console.log(campground);
  if (!campground) {
    req.flash("error", "Campground Not Found!");
    res.redirect("/campgrounds");
  }
  res.render("campgrounds/details", { campground });
};

module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id);
  if (!campground) {
    req.flash("error", "Campground Not Found!");
    res.redirect("/campgrounds");
  }
  res.render("campgrounds/edit", { campground });
};

module.exports.editCampground = async (req, res) => {
  const { id } = req.params;
  console.log(req.body);
  const campground = await Campground.findByIdAndUpdate(id, {
    ...req.body.campground,
  });
  campground.images.push(
    ...req.files.map((file) => ({
      url: file.path,
      filename: file.filename,
    }))
  );
  await campground.save();
  req.flash("success", `${req.body.campground.title} Successfully Updated!`);
  res.redirect(`/campgrounds/${campground._id}`);
};

module.exports.deleteCampground = async (req, res) => {
  const { id } = req.params;
  const campground = await Campground.findById(id, {
    ...req.body.campground,
  });
  await Campground.findByIdAndDelete(id);
  req.flash("success", `${campground.title} Successfully Deleted!`);
  res.redirect(`/campgrounds`);
};
