const utils = require("../utils/utils");
const Sauce = require("../../../models/sauce-schema");

const call = async (req, res, next) => {
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
            utils.handleError(error, res);
         });
   } catch (error) {
      utils.handleError(error, res);
   }
}

module.exports = { call };
