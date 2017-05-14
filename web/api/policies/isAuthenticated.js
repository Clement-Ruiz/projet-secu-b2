module.exports = function isAuthenticated (req, res, next) {
  if (!req.session.userID) {
    return res.redirect('/login');
  }
  return next();
}
