/**
 * Check if the file is an image with a good extension
 * @param req Request
 * @param res Response
 * @param next Next
 * @returns {*} The file if it is an image or an error message if it is not
 */
module.exports = (req, res, next) => {
   try {
      let image = req.files.image;

      // Check if the file is undefined
      if (image === undefined) {
         next();
         return;
      }

      if (image.type !== 'image/jpeg'
         && image.type !== 'image/png'
         && image.type !== 'image/gif'
         && image.type !== 'image/jpg'
         && image.type !== 'image/webp')
      {
         return res.status(400).json({
            error: "Invalid image format"
         });
      }

      next();
   } catch(error) {
      console.log("error: ", error);

      res.status(401).json({
         error: 'Unauthorized'
      });
   }
}
