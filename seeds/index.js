const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "605ceea4936b27072255762a",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ut perferendis quo vel fuga cupiditate nesciunt fugiat harum, dolor, consectetur aliquid dolores inventore obcaecati possimus repudiandae voluptatem vero, consequatur rem.",
      price: price,
      images: [
        {
          url:
            "https://res.cloudinary.com/http-cohlercoded-com/image/upload/v1616878215/YelpCamp/ufgnofl36vahljbgoxfw.jpg",
          filename: "YelpCamp/ufgnofl36vahljbgoxfw",
        },
        {
          url:
            "https://res.cloudinary.com/http-cohlercoded-com/image/upload/v1616878218/YelpCamp/tru4rtqdc05ys9pdwpeb.jpg",
          filename: "YelpCamp/tru4rtqdc05ys9pdwpeb",
        },
        {
          url:
            "https://res.cloudinary.com/http-cohlercoded-com/image/upload/v1616878225/YelpCamp/vd6hpi8ygla63hwos1ka.jpg",
          filename: "YelpCamp/vd6hpi8ygla63hwos1ka",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
