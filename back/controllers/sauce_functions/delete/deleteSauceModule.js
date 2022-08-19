const utils = require("../utils/utils");
const Sauce = require("../../../models/sauce-schema");

const call = (req, res, next) => {
   try {
      // Delete the sauce with id
      Sauce.findByIdAndRemove(req.params.id)
         .then(sauce => {
            res.status(200).json({
               message: "Sauce deleted"
            });
         })
         .catch(error => {
            utils.handleError(error, res);
         });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = { call };
