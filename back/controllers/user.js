const bcrypt = require('bcrypt');
require("dotenv/config");

const User = require('../models/user-schema');
const jwt = require("jsonwebtoken");
const { validationResult } = require('express-validator');

/**
 * @description - This function is used to generate a token.
 * @param user - The user object.
 * @returns {*} - The token.
 */
function generateToken(user) {
   const payload = {
      _id: user._id
   };

   const options = {
      expiresIn: '24h'
   };

   return jwt.sign(payload, process.env.JWT_SECRET, options);
}

/**
 * @description - This function is used to sign up a new user.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function to be called.
 */
const signup = (req, res, next) => {
   try {
      // Create a new user
      const userData = new User({
         email: req.body.email,
         password: req.body.password
      });

      User.findOne({
         email: req.body.email
      })
         .then(user => {
            // Check if user already exists
            if (user) {
               return res.status(400).json({
                  error: 'User already exists'
               });
            }

            // Hash the password
            bcrypt.hash(userData.password, 10, (err, hash) => {
               if (err) {
                  return res.status(500).json({
                     error: err
                  });
               }

               userData.password = hash;

               userData.save()
                  .then(result => {
                     res.status(201).json({
                        message: 'User created'
                     });
                  })
                  .catch(err => {
                     res.status(500).json({
                        error: err
                     });
                  });
            });
         })
   } catch (error) {
      res.status(500).json({
         error: error
      });
   }
}

/**
 * @description - This function is used to sign in a user.
 * @param req - The request object.
 * @param res - The response object.
 * @param next - The next middleware function to be called.
 */
const login = (req, res, next) => {
   try {
      // Find user by email
      User.findOne({
         email: req.body.email
      })
         .then(user => {
            // Check if user exists
            if (!user) {
               // If user does not exist, return error
               return res.status(404).json({
                  error: 'User not found'
               });
            }

            // Check if password is correct
            bcrypt.compare(req.body.password, user.password, (err, result) => {
               if (err) {
                  return res.status(500).json({
                     error: err
                  });
               }

               // If password is correct, send the user's email and token
               if (result) {
                  // Send the user's email and token
                  const token = generateToken(user);

                  // Send the user's id and token
                  res.status(200).json({
                     userId: user._id,
                     token: token
                  });
               } else {
                  // If password is incorrect, send an error message
                  res.status(401).json({
                     error: 'Password is incorrect'
                  });
               }
            });
         })
         .catch(err => {
            // If an error occurs, send an error message
            res.status(500).json({
               error: err
            });
         });
   } catch (error) {
      res.status(500).json({
         error: error
      });
   }
}

module.exports = {
   signup,
   login
};
