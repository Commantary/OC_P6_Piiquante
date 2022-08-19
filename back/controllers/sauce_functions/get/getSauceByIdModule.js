const utils = require("../utils/utils");
const Sauce = require("../../../models/sauce-schema");

const call = (req, res, next) => {
   try {
      // Return sauce with id
      Sauce.findById(req.params.id)
         .then(sauce => {
            res.status(200).json(sauce);
         })
         .catch(error => {
            utils.handleError(error, res);
         });
   } catch (error) {
      utils.handleError(error, res);
   }
};

module.exports = { call };
