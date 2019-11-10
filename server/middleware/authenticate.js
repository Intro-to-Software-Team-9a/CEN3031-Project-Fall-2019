
/**
 * Asserts that `req.session.accountId` exists.
 */
function authenticate() {
  return (req, res, next) => {
    if (!req.session.accountId || !req.session.profileId) {
      return res.status(401).send();
    }

    return next();
  };
}


module.exports = {
  authenticate,
};
