const { Schema, model } = require("mongoose");
const userSchema = Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },

  },
  {
    versionKey: false,
  }
);
const userModel = model("users", userSchema);
module.exports = { userModel };
