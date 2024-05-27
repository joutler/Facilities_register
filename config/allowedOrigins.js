/**
 * Array of allowed origins for CORS (Cross-Origin Resource Sharing) requests.
 * 
 * @type {string[]}
 */

const dbURL = process.env.MONGODB_URI;
const allowedOrigins = [
    'http://localhost:3500',
    'http://localhost:3000',
    'http://localhost:3001',
    dbURL
];

module.exports = allowedOrigins;