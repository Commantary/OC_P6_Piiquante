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

const validateSauceData = (res, name, manufacturer, description, mainPepper, heat, req) => {
   return require("../utils/validateSauceData").validateSauceData(res, name, manufacturer, description, mainPepper, heat, req);
}

module.exports = { handleError, saveImage, validateSauceData };
