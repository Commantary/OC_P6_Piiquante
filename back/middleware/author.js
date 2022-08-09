const jwt = require('jsonwebtoken');
const Sauce = require('../models/sauce-schema');

require('dotenv/config');

/**
 * The function that checks if the user is authorized to access the route
 * if the user is the author of the sauce, he can access the route
 * @param req Request
 * @param res Response
 * @param next Next
 */
module.exports = (req, res, next) => {
   try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decodedToken._id;

      // Check if sauce with his id exists
      Sauce.findById(req.params.id)
         .then(sauce => {
            if (!sauce) {
               return res.status(404).json({
                  error: 'Sauce not found'
               });
            }

            if (sauce.userId !== userId) {
               return res.status(403).json({
                  error: 'Unauthorized request'
               });
            }

            next();
         })
         .catch(error => {
            res.status(500).json({
               error: error
            });
         });
   } catch {
      return res.status(403).json({
         error: 'Unauthorized request'
      });
   }
}
