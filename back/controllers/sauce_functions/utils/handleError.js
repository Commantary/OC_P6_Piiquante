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

module.exports = { handleError };
