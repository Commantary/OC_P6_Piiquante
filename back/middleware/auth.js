const jwt = require('jsonwebtoken');
const User = require('../models/user-schema');

require('dotenv/config');

/**
 * The function that checks if the user is authorized to access the route
 * @param req Request
 * @param res Response
 * @param next Next
 */
module.exports = (req, res, next) => {
   try {
      if(!req.headers.authorization) {
         // If header authorization is missing return 401

         return res.status(401).json({
            error: 'Unauthorized'
         });
      }

      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken._id;

      // Check if user with his id exists
      User.findById(userId)
         .then(user => {
            if (!user) {
               // Don't allow access if user is not found
               return res.status(403).json({
                  error: 'Unauthorized request'
               });
            }

            // Allow access if user is found
            next();
         })
         .catch(error => {
            console.log("error: ", error);

            res.status(500).json({
               error: "Server error"
            });
            next();
         })
   } catch(error) {
      console.log("error: ", error);

      res.status(401).json({
         error: 'Unauthorized'
      });
   }
}
