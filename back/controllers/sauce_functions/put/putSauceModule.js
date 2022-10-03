const utils = require("../utils/utils");
const Sauce = require("../../../models/sauce-schema");

const call = (req, res, next) => {
   try {
      // Update the sauce with a new image & sauce data
      if (req.body.sauce) {
         let sauceData = JSON.parse(req.body.sauce);
         const {name, manufacturer, description, mainPepper, heat} = sauceData;

         if(utils.validateSauceData(res, name, manufacturer, description, mainPepper, heat, req))
            return;

         Sauce.findByIdAndUpdate(req.params.id, {
            name,
            manufacturer,
            description,
            mainPepper,
            heat,
            imageUrl: utils.saveImage(req, req.files.image, sauceData.name)
         }, {new: true})
            .then(sauce => {
               res.status(200).json({message: "Sauce updated"});
            })
            .catch(error => {
               utils.handleError(error, res);
            });
      } else { // Update without image
         const {name, manufacturer, description, mainPepper, heat} = req.body;

         if (utils.validateSauceData(res, name, manufacturer, description, mainPepper, heat))
            return;

         Sauce.findByIdAndUpdate(req.params.id, {
            name,
            manufacturer,
            description,
            mainPepper,
            heat,
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

module.exports = {call};
