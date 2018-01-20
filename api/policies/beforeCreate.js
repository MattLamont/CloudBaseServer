module.exports = function(req, res, next) {

  req.body.owner = req.user.id;
  return next();
};
