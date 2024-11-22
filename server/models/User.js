const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    phoneNumber: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
