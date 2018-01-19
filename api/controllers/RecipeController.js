/**
 * RecipeController
 *
 * @description :: Server-side logic for managing Recipes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var UserService = require('../services/UserService');

module.exports = {

  findOne: function( req , res ){
    return sails.hooks.blueprints.middleware.findone(req, res);
  },

  find: function( req , res ){
    return sails.hooks.blueprints.middleware.find(req, res);
  },

  create: function( req , res ){

    UserService.addRecipe( req.user.id , function( user ){
      return sails.hooks.blueprints.middleware.create(req, res);
    });

  },


  destroy: function( req , res ){

    UserService.removeRecipe( req.user.id , function( user ){
      return sails.hooks.blueprints.middleware.destroy(req, res);
    });

  }
};
