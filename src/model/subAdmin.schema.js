const { Schema, model } = require("mongoose");

const subadminSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: [
        "user",
        "worker",
        "teacher",
        "institute",
        "headstate",
        "jobposter",
        "admin",
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Subadmin", subadminSchema);
