/**
 * Handle error
 * @param err Error
 * @param res Response
 */
const handleError = (err, res) => {
   require("../utils/handleError").handleError(err, res);
}

/**
 * Save the image and get the image url
 * @param req Request
 * @param image Image
 * @param name Name
 * @returns {string} Image url
 */
const saveImage = (req, image, name) => {
   return require("../utils/saveImage").saveImage(req, image, name);
}

module.exports = { handleError, saveImage };
