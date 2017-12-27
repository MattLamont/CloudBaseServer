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

    following: {
      collection: 'user',
      via: 'followers',
    },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  },
  beforeCreate: function(user, cb) {

    delete user.password_confirmation;
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(user.password, salt, function() {}, function(err, hash) {
        user.password = hash;
        cb(null, user);
      });
    });
  }
};
