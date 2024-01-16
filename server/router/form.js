const express = require("express");
const router = express.Router();
const Fome = require("../Models/form");

router.post("/form", async (req, res) => {
  try {
    const { name, gender, nationality, phone, address, message } = req.body;

    console.log(name, gender, nationality, phone, address, message);

    if (!name || !gender || !nationality || !phone || !address || !message) {
      return res
        .status(400)
        .json({ error: "Name and email are required fields." });
    }

    console.log(name);
    // // Create a new FormData instance
    const newFormData = new Fome({
      name,
      gender,
      nationality,
      phone,
      address,
      message,
      // Add other form fields as needed
    });

    // Save the form data to the database
    await Fome.create(newFormData);

    res.status(201).json({ message: "Form data stored successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/survey-data", async (req, res) => {
  try {
    const formData = await Fome.find({});

    res.status(200).json(formData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
