const express = require('express');
const author = require('../middleware/author');
const fileType = require('../middleware/fileType');
const router = express.Router();

const {
   getAllSauces,
   getSauceById,
   createSauce,
   updateSauce,
   deleteSauce,
   updateSauceLikes
} = require('../controllers/sauce');

router.route('/').get(getAllSauces);
router.route('/:id').get(getSauceById);
router.route('/:id').delete(author, deleteSauce);
router.route('/:id/like').post(updateSauceLikes);
router.route('/').post(fileType, createSauce); // here we save an image
router.route('/:id').put(author, fileType, updateSauce); // Here we can save an image

module.exports = router;
