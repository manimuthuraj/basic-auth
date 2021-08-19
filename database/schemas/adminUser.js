const mongoose = require("mongoose");
const Schema = mongoose.Schema;


module.exports = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      require: true
    },
    email: {
        type: String,
        require: true
      },
    createdAt:{
        type:Date
    },
    updatedAt:{
        type:Date
    }
});
