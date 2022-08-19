const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

function saveImage(req, image, name) {
   // Save image in images folder with fs module
   const imageName = `${Math.floor(Date.now() / 1000)}_${name}`;
   // Path of the image with the timestamp and name of the sauce
   const imageDirPath = path.join(__dirname, "../../../images");
   const imagePath = `${imageDirPath}/${imageName}.${image.name.split('.').pop()}`;

   // Get the width from the image with sharp
   sharp(image.path)
      .metadata()
      .then(metadata => {
         // If the width is greater than 500px, resize the image to 500px
         if (metadata.width > 500) {
            // Resize the image to 500px
            sharp(image.path)
               .resize(500)
               .toFile(imagePath, (err) => {
                  if (err) {
                     console.log(err);
                  }
               });
         } else {
            // Save the image to the image folder without resizing
            sharp(image.path)
               .toFile(imagePath, (err) => {
                  if (err) {
                     console.log(err);
                  }
               });
         }
      });

   // Check if image is saved
   fs.readFile(image.path, (err, data) => {
      if (err) {
         console.log(err);
         return null;
      }
   });

   return `${req.protocol}://${req.get('host')}/images/${imageName}.${image.name.split('.').pop()}`;
}

module.exports = {saveImage};
