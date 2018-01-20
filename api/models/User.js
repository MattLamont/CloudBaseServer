/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt-nodejs');
var auth = require('../services/auth');

module.exports = {

  attributes: {

    username: {
      type: 'STRING',
      required: true,
      unique: true
    },

    email: {
      type: 'STRING',
      required: true,
      unique: true
    },

    password: {
      type: 'STRING',
      required: true
    },

    isAdmin: {
      type: 'BOOLEAN',
      defaultsTo: false
    },

    isDeleted: {
      type: 'BOOLEAN',
      defaultsTo: false
    },

    image_url: {
      type: 'url',
      defaultsTo: ''
    },

    biography: {
      type: 'string',
      defaultsTo: ''
    },

    recipes: {
      collection: 'recipe',
      via: 'owner'
    },

    recipe_count: {
      type: 'integer',
      defaultsTo: 0
    },

    liked_recipes: {
      collection: 'recipe',
      via: 'likes',
      dominant: true
    },

    disliked_recipes: {
      collection: 'recipe',
      via: 'dislikes',
      dominant: true
    },

    saved_recipes: {
      collection: 'recipe',
      via: 'saves',
      dominant: true
    },

    reviewed_recipes: {
      collection: 'review',
      via: 'owner',
      dominant: true
    },

    followers: {
      collection: 'user',
      via: 'following',
    },

    followers_count: {
      type: 'integer',
      defaultsTo: 0
    },

    following: {
      collection: 'user',
      via: 'followers',
    },

    following_count: {
      type: 'integer',
      defaultsTo: 0
    },

    settings: {
      type: 'json',
      defaultsTo: {
        theme: 'light',
        sidebar: 'push',
        recipe_display: 'cards'
      }
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },

  beforeCreate: function(user, cb) {

    //user.recipes_count = 0;
    //user.followers_count = 0;
    //user.following_count = 0;

    delete user.password_confirmation;
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function() {}, function(err, hash) {
        user.password = hash;
        cb(null, user);
      });
    });
  },

};
