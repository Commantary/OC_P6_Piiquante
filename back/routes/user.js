const express = require('express');
const router = express.Router();
const validationErrors = require('../middleware/validationErrors');
const { body, check } = require('express-validator');

const {
   signup,
   login
} = require('../controllers/user');

const validateData = [
   check('password', 'The password must be 8+ chars long and contain a number')
      .not()
      .isIn(['12345678', 'password'])
      .withMessage('Do not use a common word as the password')
      .isLength({ min: 8 })
      .matches(/\d/),
   body('email')
      .isEmail()
      .withMessage('Please enter a valid email address.')
];

router.route('/signup').post(validateData, validationErrors, signup);
router.route('/login').post(login);

module.exports = router;
