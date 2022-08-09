const express = require('express');
const multer = require('multer');
const author = require('../middleware/author');
const router = express.Router();

// const upload = multer({ dest: "../images" });

const multerStorage = multer.diskStorage({
   destination: (req, file, cb) => {
      cb(null, "../images");
   },
   filename: (req, file, cb) => {
      const ext = file.mimetype.split("/")[1];
      cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
   },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
   if (file.mimetype.split("/")[1] === "webp") {
      cb(null, true);
   } else {
      cb(new Error("Not a PDF File!!"), false);
   }
};

const upload = multer({
   storage: multerStorage,
   fileFilter: multerFilter,
});

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
router.route('/').post(upload.single("myFile"), createSauce); // here we save an image
router.route('/:id').put(author, upload.single("myFile"), updateSauce); // Here we can save an image

module.exports = router;
