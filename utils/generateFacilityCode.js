// utils/generateFacilityCode.js
const Facility = require('../models/facility');

const generateFacilityCode = (districtCode) => {
  const randomNumber = Math.floor(Math.random() * 1000000);
  return `${districtCode}${randomNumber.toString().padStart(6, '0')}`;
};

const getUniqueFacilityCode = async (districtCode) => {
  let facilityCode;
  let isUnique = false;

  while (!isUnique) {
    facilityCode = generateFacilityCode(districtCode);
    const existingFacility = await Facility.findOne({ facility_code: facilityCode });
    if (!existingFacility) {
      isUnique = true;
    }
  }

  return facilityCode;
};

module.exports = { getUniqueFacilityCode };
