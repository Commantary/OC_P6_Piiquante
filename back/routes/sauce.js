const express = require('express');
const author = require('../middleware/author');
const fileType = require('../middleware/fileType');
const validationErrors = require('../middleware/validationErrors');
const router = express.Router();
const { body, check } = require('express-validator');

const {
   getAllSauces,
   getSauceById,
   createSauce,
   updateSauce,
   deleteSauce,
   updateSauceLike
} = require('../controllers/sauce');

router.route('/').get(getAllSauces);
router.route('/:id').get(getSauceById);
router.route('/:id/like').post(updateSauceLike);
router.route('/:id').delete(author, deleteSauce);
router.route('/:id').put(author, fileType, updateSauce); // Here we can save an image
router.route('/').post(fileType, createSauce); // here we save an image

module.exports = router;
