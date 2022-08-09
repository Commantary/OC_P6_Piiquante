const Sauce = require('../models/sauce-schema');
const File = require('../models/file-schema');
const fs = require("fs");

/**
 * Get all sauces from the database
 * @param req
 * @param res
 * @param next
 */
const getAllSauces = (req, res, next) => {
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
      res.status(500).json({
         error: error
      });
   }
}

/**
 * Get sauce by id from the database
 * @param req
 * @param res
 * @param next
 */
const getSauceById = (req, res, next) => {
   try {
      // Return sauce with id
      Sauce.findById(req.params.id)
         .then(sauce => {
            res.status(200).json(sauce);
         })
         .catch(error => {
            handleError(error, res);
         });
   } catch (error) {
      handleError(error, res);
   }
};

/**
 * Create a new sauce in the database
 * @param req Request
 * @param res Response
 * @param next Next
 */
const createSauce = async (req, res, next) => {
   try {
      // Get sauce data
      let sauceData = JSON.parse(req.body.sauce);

      // Save the sauce with model
      let sauce_ = new Sauce({
         ...sauceData,
         imageUrl: saveImage(req, req.files.image, sauceData.name) // Save the image and get the image url
      });

      // Create / save the sauce
      sauce_.save((err, sauce) => {
         if (err) {
            handleError(err, res);
         } else {
            res.status(201).json({
               message: "Sauce created"
            });
         }
      });
   } catch (error) {
      handleError(error, res);
   }
}

/**
 * Update sauce in the database
 * @param req Request
 * @param res Response
 * @param next Next
 */
const updateSauce = (req, res, next) => {
   try {
      // Update the sauce with a new image & sauce data
      if (req.body.sauce) {
         let sauceData = JSON.parse(req.body.sauce);

         Sauce.findByIdAndUpdate(req.params.id, {
            ...sauceData,
            imageUrl: saveImage(req, req.files.image, sauceData.name)
         }, {new: true})
            .then(sauce => {
               res.status(200).json({ message: "Sauce updated" });
            })
            .catch(error => {
               handleError(error, res);
            });
      } else { // Update without image
         Sauce.findByIdAndUpdate(req.params.id, {
            ...req.body,
         }, {new: true})
            .then(sauce => {
               res.status(200).json({ message: "Sauce updated" });
            })
            .catch(error => {
               handleError(error, res);
            });
      }
   } catch (error) {
      handleError(error, res);
   }
}

/**
 * Delete sauce from the database
 * @param req Request
 * @param res Response
 * @param next Next
 */
const deleteSauce = (req, res, next) => {
   try {
      // Delete the sauce with id
      Sauce.findByIdAndRemove(req.params.id)
         .then(sauce => {
            res.status(200).json({
               message: "Sauce deleted"
            });
         })
         .catch(error => {
            handleError(error, res);
         });
   } catch (error) {
      handleError(error, res);
   }
}

/**
 * Update like/dislike of a sauce
 * @param req Request
 * @param res Response
 * @param next Next
 */
const updateSauceLikes = async (req, res, next) => {
   try {
      let userId = req.body.userId;
      let like = req.body.like;
      let filter = {_id: req.params.id};

      let sauce = await Sauce.findById(req.params.id);
      let likesArr = sauce.usersLiked;
      let dislikesArr = sauce.usersDisliked;

      let update = {};

      switch (Number.parseInt(like)) {
         case 1:
            // Add userId to likes array
            likesArr.push(userId);

            update = {
               likes: sauce.likes + 1,
               usersLiked: likesArr
            }
            break;
         case 0:
            let userLikedFilter = likesArr.filter(user => user === userId).length > 0;
            let userDislikedFilter = dislikesArr.filter(user => user === userId).length > 0;

            update = {
               likes: userLikedFilter ? sauce.likes - 1 : sauce.likes,
               usersLiked: userLikedFilter ? likesArr.filter(user => user !== userId) : likesArr,
               dislikes: userDislikedFilter ? sauce.dislikes - 1 : sauce.dislikes,
               usersDisliked: userDislikedFilter ? dislikesArr.filter(user => user !== userId) : dislikesArr
            }
            break;
         case -1:
            // Add userId to dislikes array
            dislikesArr.push(userId);

            update = {
               dislikes: sauce.dislikes + 1,
               usersDisliked: dislikesArr
            }
      }

      Sauce.findOneAndUpdate(filter, update, {new: true})
         .then(sauce => {
            res.status(200).json({message: "Sauce likes/dislikes updated"});
         })
         .catch(error => {
            handleError(error, res);
         });
   } catch (error) {
      handleError(error, res);
   }
}

function saveImage(req, image, name) {
   // Save image in images folder with fs module
   const imageName = `${Math.floor(Date.now() / 1000)}_${name}`;
   // Path of the image with the timestamp and name of the sauce
   const imagePath = `${__dirname}/../images/${imageName}.${image.name.split('.').pop()}`;

   // Move image to images folder
   fs.readFile(image.path, (err, data) => {
      if (err) {
         console.log(err);
         return null;
      } else {
         fs.writeFile(imagePath, data, (err) => {
            if (err) {
               console.log(err);
            }
         });
      }
   });

   return `${req.protocol}://${req.get('host')}/images/${imageName}.${image.name.split('.').pop()}`;
}

/**
 * Handle error
 * @param err Error
 * @param res Response
 */
function handleError(err, res) {
   console.log("error: ", err);

   res.status(500).json({
      error: err
   });
}

module.exports = {
   getAllSauces,
   getSauceById,
   createSauce,
   updateSauce,
   deleteSauce,
   updateSauceLikes
};
