const jwt = require('jsonwebtoken');
const User = require('../models/Owner'); // Import the User model

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    try {
        // Find user by refreshToken
        const user = await User.findOne({ refreshToken: refreshToken });
        if (!user) return res.sendStatus(403); // Forbidden

        // Verify refreshToken
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err || user.name !== decoded.username) return res.sendStatus(403);
            const roles = Object.values(user.roles);
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles,
                    } 
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken });
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 'message': 'Internal Server Error' });
    }
};

module.exports = { handleRefreshToken };
