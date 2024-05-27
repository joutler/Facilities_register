const bcrypt = require('bcrypt');
const Owner = require('../models/Owner'); // Import the Owner model

const handleNewUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !password || !email) return res.status(400).json({ 'message': 'Username, email, and password are required.' });

    try {
        // Check for existing user with the same email
        const existingUser = await Owner.findOne({ email: email });
        if (existingUser) return res.status(409).json({ message: 'Owner already exists.' });

        // Encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);

        // Store the new user
        const newUser = new Owner({
            name: name,
            email: email,
            password: hashedPwd,
            isAdmin: false
        });

        await newUser.save();
        console.log('Owner created:', newUser);
        res.status(201).json({ success: `New user ${newUser.name} created!` });
    } catch (err) {
        console.error('Error during user creation:', err);
        res.status(500).json({ message: err.message });
    }
};

const getAllOwners = async (req, res) => {
    try {
      // Retrieve all owners from the database
      const owners = await Owner.find();
      res.status(200).json(owners);
    } catch (error) {
      console.error('Error retrieving owners:', error);
      res.status(500).json({ message: 'An error occurred while retrieving owners' });
    }
  };
  
module.exports = { handleNewUser, getAllOwners };
