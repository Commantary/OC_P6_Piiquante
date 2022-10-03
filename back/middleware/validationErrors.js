const  {validationResult } = require("express-validator");

/**
 * The function that checks if the user is authorized to access the route
 * @param req Request
 * @param res Response
 * @param next Next
 * @returns {*}
 */
module.exports = (req, res, next) => {
   const errors = validationResult(req);

   if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
   }

   next()
}
