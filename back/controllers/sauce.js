const getAllSaucesModule = require("./sauce_functions/get/getAllSaucesModule");
const getSauceByIdModule = require("./sauce_functions/get/getSauceByIdModule");
const updateSauceModule = require("./sauce_functions/put/putSauceModule");
const createSauceModule = require("./sauce_functions/post/postSauceModule");
const deleteSauceModule = require("./sauce_functions/delete/deleteSauceModule");
const updateSauceLikesModule = require("./sauce_functions/post/postSauceLikesModule");

/**
 * Get all sauces from the database
 * @param req
 * @param res
 * @param next
 */
const getAllSauces = (req, res, next) => {
   getAllSaucesModule.call(req, res, next);
}

/**
 * Get sauce by id from the database
 * @param req
 * @param res
 * @param next
 */
const getSauceById = (req, res, next) => {
   getSauceByIdModule.call(req, res, next);
};

/**
 * Create a new sauce in the database
 * @param req Request
 * @param res Response
 * @param next Next
 */
const createSauce = async (req, res, next) => {
   await createSauceModule.call(req, res, next);
}

/**
 * Update sauce in the database
 * @param req Request
 * @param res Response
 * @param next Next
 */
const updateSauce = (req, res, next) => {
   updateSauceModule.call(req, res, next);
}

/**
 * Delete sauce from the database
 * @param req Request
 * @param res Response
 * @param next Next
 */
const deleteSauce = (req, res, next) => {
   deleteSauceModule.call(req, res, next);
}

/**
 * Update like/dislike of a sauce
 * @param req Request
 * @param res Response
 * @param next Next
 */
const updateSauceLike = (req, res, next) => {
   updateSauceLikesModule.call(req, res, next);
}

module.exports = {
   createSauce,
   deleteSauce,
   getAllSauces,
   getSauceById,
   updateSauce,
   updateSauceLike
}
