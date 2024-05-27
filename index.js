const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const connectDB = require('./config/db');

// custom middleware logger
// app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//middleware for cookies
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

// built-in middleware for json 
app.use(express.json());



// Connect to MongoDB
connectDB();
app.use(errorHandler);

// app.get("/", (res,req) => {
//     res.json({message: "Server running..."});
// });

// Routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/facilities', require('./routes/facility'));
// Mount district routes
app.use('/districts', require('./routes/district'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
