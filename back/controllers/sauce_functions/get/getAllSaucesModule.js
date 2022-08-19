const utils = require("../utils/utils");
const Sauce = require("../../../models/sauce-schema");

const call = (req, res, next) => {
   try {
      // Return all sauces
      Sauce.find()
         .then(sauces => {
            res.status(200).json(sauces);
         })
         .catch(error => {
            res.status(500).json({
               error: error
            });
         });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = { call };
