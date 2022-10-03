function validateSauceData(res, name, manufacturer, description, mainPepper, heat, req) {
   if (typeof name !== "string") {
      res.status(400).json({message: "Name must be a string"});
      return true;
   } else if (typeof manufacturer !== "string") {
      res.status(400).json({message: "Manufacturer must be a string"});
      return true;
   } else if (typeof description !== "string") {
      res.status(400).json({message: "Description must be a string"});
      return true;
   } else if (typeof mainPepper !== "string") {
      res.status(400).json({message: "Main pepper must be a string"});
      return true;
   } else if (typeof heat !== "number") {
      res.status(400).json({message: "Heat must be a number"});
      return true;
   }

   // Check value of heat
   if (heat < 1 || heat > 10) {
      res.status(400).json({message: "Heat must be between 1 and 10"});
      return true;
   }

   if (req && !req.files.image) {
      res.status(400).json({message: "Image is required"});
      return true;
   }

   return false;
}

module.exports = {validateSauceData};
