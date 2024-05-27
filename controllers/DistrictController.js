const District = require('../models/District');

// Controller function to handle fetching all districts
const getAllDistricts = async (req, res) => {
  try {
    const districts = await District.find();
    res.json(districts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function to handle creating a new district
const createDistrict = async (req, res) => {
  const { code, name } = req.body;

  try {
    const existingDistrict = await District.findOne({ code });
    if (existingDistrict) {
      return res.status(400).json({ message: 'District code already exists' });
    }

    const newDistrict = new District({ code, name });
    await newDistrict.save();
    res.status(201).json(newDistrict);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllDistricts, createDistrict };
