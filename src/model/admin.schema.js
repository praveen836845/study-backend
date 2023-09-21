const { Schema, model } = require("mongoose");

const adminSchema = Schema(
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
    roles: {
      type: [
        {
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
        },
      ],
      default: ["admin"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Admin", adminSchema);
