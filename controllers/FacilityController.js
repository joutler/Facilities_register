const District = require('../models/District');
const Facility = require('../models/facility');
const { getUniqueFacilityCode } = require('../utils/generateFacilityCode');

const addFacility = async (req, res) => {
  const { facilityName, districtId, ownerId } = req.body;

  // Validate required fields
  if (!facilityName || !districtId || !ownerId) {
    return res.status(400).json({ message: 'Facility name, district ID, and owner ID are required' });
  }

  try {
    // Check if the district exists
    const district = await District.findById(districtId);
    if (!district) {
      return res.status(404).json({ message: 'District not found' });
    }

    // Check if the facility already exists based on its ID
    const existingFacility = await Facility.findOne({ district_id: districtId, owner_id: ownerId });
    if (existingFacility) {
      return res.status(409).json({ message: 'Facility already exists for this district and owner', facility: existingFacility });
    }

    // Generate a unique facility code based on the district code
    const facilityCode = await getUniqueFacilityCode(district.code);

    // Create and save the new facility
    const newFacility = new Facility({
      facility_code: facilityCode,
      facility_name: facilityName,
      district_id: districtId,
      owner_id: ownerId,
    });

    await newFacility.save();
    res.status(201).json({ message: 'Facility created successfully', facility: newFacility });
  } catch (error) {
    console.error('Error adding facility:', error.message);
    res.status(500).json({ message: 'An error occurred while adding the facility' });
  }
};

const getAllFacilities = async (req, res) => {
    try {
      const facilities = await Facility.find();
      res.status(200).json(facilities);
    } catch (error) {
      console.error('Error retrieving facilities:', error);
      res.status(500).json({ message: 'An error occurred while retrieving facilities' });
    }
  };

  const getFacilityById = async (req, res) => {
    const facilityId = req.params.id;
  
    try {
      const facility = await Facility.findById(facilityId);
      if (!facility) {
        return res.status(404).json({ message: 'Facility not found' });
      }
      res.status(200).json(facility);
    } catch (error) {
      console.error('Error retrieving facility:', error);
      res.status(500).json({ message: 'An error occurred while retrieving the facility' });
    }
  };
  
module.exports = { addFacility,getAllFacilities,getFacilityById };
