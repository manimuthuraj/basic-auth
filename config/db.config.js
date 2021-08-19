require("dotenv/config");
  const mongoose = require("mongoose");
  let connect = async () => {
    mongoose.connect(process.env.mongooseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    let db = mongoose.connection;
    db.on("error", (err) => {
      console.log(
        "MongoDB connection error. Please make sure MongoDB is running");
      process.exit();
    });
    db.on("connect", (err) => {
      console.log(
      "MongoDB connection error. Please make sure MongoDB is running."
      );
      process.exit();
    });
  };
  module.exports = { connect };
  