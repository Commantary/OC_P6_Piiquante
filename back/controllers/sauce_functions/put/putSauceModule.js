const utils = require("../utils/utils");
const Sauce = require("../../../models/sauce-schema");

const call = (req, res, next) => {
   try {
      // Update the sauce with a new image & sauce data
      if (req.body.sauce) {
         let sauceData = JSON.parse(req.body.sauce);

         Sauce.findByIdAndUpdate(req.params.id, {
            ...sauceData,
            imageUrl: utils.saveImage(req, req.files.image, sauceData.name)
         }, {new: true})
            .then(sauce => {
               res.status(200).json({message: "Sauce updated"});
            })
            .catch(error => {
               utils.handleError(error, res);
            });
      } else { // Update without image
         Sauce.findByIdAndUpdate(req.params.id, {
            ...req.body,
         }, {new: true})
            .then(sauce => {
               res.status(200).json({message: "Sauce updated"});
            })
            .catch(error => {
               utils.handleError(error, res);
            });
      }
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = { call };
