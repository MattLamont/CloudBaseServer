/**
 * isOwner
 *
 * @module      :: Policy
 * @description :: Simple policy to only allow owner access
 *
 *
 */
module.exports = function(req, res, next) {

  //If this is an admin, then they can edit anything
  if (req.user.isAdmin) {
    return next();
  }

  var model_name = req.options.model;
  var Model = sails.models[model_name];

  var resource_id = 0;
  if( req.param('parentid') ) resource_id = req.param('parentid');
  else resource_id = req.param('id');

  Model.find({
    id: resource_id
  })
  .exec(function(err, resource) {

    if (err) return res.notFound(err);

    if( !resource[0] ) return res.notFound();

    //If trying to access the User object: check to make sure the current user id matches the resource user id
    if( model_name == 'user' && (req.user.id == resource[0].id) ){
      return next();
    }

    //otherwise make sure that the resource owner is the same as current user id
    if( req.user.id == resource[0].owner ){
      return next();
    }

    return res.forbidden('You are not the owner of this.');
  });
};
