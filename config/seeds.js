var recipeSeed = require('../seeds/development/RecipeSeed.js');
var userSeed = require('../seeds/development/UserSeed.js');
var flavorSeed = require('../seeds/development/FlavorSeed.js');

var toBool = require("to-bool");

/**
 * Sails Seed Settings
 * (sails.config.seeds)
 *
 * Configuration for the data seeding in Sails.
 *
 * For more information on configuration, check out:
 * http://github.com/frostme/sails-seed
 */

let recipes = [];

recipeSeed(function(err, data) {
  recipes = data;
});

let users = [];

userSeed(function(err, data) {
  users = data;
});

let flavors = [];

flavorSeed(function(err, data) {
  flavors = data;
});

module.exports.seeds = {

  disable: toBool( process.env.SEEDING_DISABLED ),
  user: users,
  recipe: recipes,
  flavor: flavors,

}
