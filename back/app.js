const express = require('express');
const path = require('path');
const cors = require('cors');
const formData = require('express-form-data');

const saucesRoutes = require('./routes/sauce');
const usersRoutes = require('./routes/user');

const rateLimit = require('express-rate-limit');
const auth = require('./middleware/auth');

const apiLimiter = rateLimit({
   windowMs: 15 * 60 * 1000, // 15 minutes
   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

const app = express();

app.use(formData.parse());

// Set CORS headers with module cors
app.use(cors());

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.static('images'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api/auth', apiLimiter, usersRoutes);
app.use('/api/sauces', apiLimiter, auth, saucesRoutes);

module.exports = app;
