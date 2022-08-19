const utils = require("../utils/utils");
const Sauce = require("../../../models/sauce-schema");

const call = async (req, res, next) => {
   try {
      // Get sauce data
      let sauceData = JSON.parse(req.body.sauce);

      // Save the sauce with model
      let sauce_ = new Sauce({
         ...sauceData,
         imageUrl: utils.saveImage(req, req.files.image, sauceData.name) // Save the image and get the image url
      });

      // Create / save the sauce
      sauce_.save((err, sauce) => {
         if (err) {
            utils.handleError(err, res);
         } else {
            res.status(201).json({
               message: "Sauce created"
            });
         }
      });
   } catch (error) {
      utils.handleError(error, res);
      utils.handleError(error, res);
   }
}

module.exports = { call };
