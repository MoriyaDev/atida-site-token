const express = require("express");
const { auth } = require("../middlewares/auth");
const { CountryModel, validCountry } = require("../models/countryModel");
const router = express.Router();

// GET ALL
router.get("/", auth, async (req, res) => {
  try {
    const countries = await CountryModel.find({user_id: req.tokenData._id});
    res.json(countries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

 // ADD NEW
router.post("/", auth, async (req, res) => {
  let validBody = validCountry(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  try {
    let country = new CountryModel(req.body);
    country.user_id = req.tokenData._id;

    await country.save();
    res.status(201).json(country);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});


// DELETE
router.delete("/:id", auth, async (req, res) => {
  try {
    let deleted = await CountryModel.deleteOne({
      _id: req.params.id,
      user_id: req.tokenData._id, 
    });

    if (deleted.deletedCount === 0) {
      return res.status(404).json({ msg: "Country not found or not yours" });
    }

    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

// UPDATE
router.put("/:id", auth, async (req, res) => {
  let validBody = validCountry(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }

  try {
    let updated = await CountryModel.updateOne(
      { _id: req.params.id, user_id: req.tokenData._id }, // רק המדינות של המשתמש
      req.body
    );

    if (updated.matchedCount === 0) {
      return res.status(404).json({ msg: "Country not found or not yours" });
    }

    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "err", err });
  }
});

module.exports = router;