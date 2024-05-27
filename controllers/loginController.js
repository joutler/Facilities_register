const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Owner = require('../models/Owner'); // Import the Owner model

/**
 * Handles the login request.
 * @param req - The request object.
 * @param res - The response object.
 */
const handleLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ 'message': 'Username and password are required.' });
  }

  try {
    // Check if user exists
    const user = await Owner.findOne({ email: email });
    if (!user) {
      return res.sendStatus(401); // Unauthorized
    }

    // Evaluate password
    const match = await bcrypt.compare(password, user.password);
    
    if (match) {
      // Create JWT token
      const accessToken = jwt.sign(
        { "UserInfo": { "username": user.name } },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' } // Adjust token expiration as needed
      );
      const refreshToken = jwt.sign(
        { "username": user.name },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '1d' }
      );

      // Save refreshToken with current user in database
      user.refreshToken = refreshToken;
      await user.save();

      res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 });
      res.json({ accessToken, user: user });
    } else {
      return res.status(500).json({ 'message': 'Incorrect email or password.' });
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 'message': 'Internal Server Error' });
  }
};

module.exports = { handleLogin };
