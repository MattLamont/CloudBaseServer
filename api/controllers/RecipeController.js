/**
 * RecipeController
 *
 * @description :: Server-side logic for managing Recipes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var RecipeResponse = require('../services/RecipeResponse');

module.exports = {

  find: function(req, res) {

		var override = RecipeResponse.createRecipeResOverride( req , res );
    return sails.hooks.blueprints.middleware.find(req, override);
  },

	findOne: function(req, res) {

		var override = RecipeResponse.createRecipeResOverride( req , res );
    return sails.hooks.blueprints.middleware.find(req, override);
  }

};
