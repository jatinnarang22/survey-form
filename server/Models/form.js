const mongoose = require("mongoose");
const { object } = mongoose.Schema.Types;
const formSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
    },
    nationality: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    message: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: {
      createdAt: "created_at", // Use `created_at` to store the created date
      updatedAt: "updated_at", // and `updated_at` to store the last updated date
    },
  }
);
let Form = mongoose.model("Form", formSchema);
module.exports = Form;
