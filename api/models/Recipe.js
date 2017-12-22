/**
 * Recipe.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    owner: {
      model: 'user',
      required: true
    },

    flavors: {
      collection: 'flavor',
      via: 'id',
      required: true
    },

    pg_percent: {
      type: 'integer',
      min: 0,
      max: 100,
      required: true,
    },

    vg_percent: {
      type: 'integer',
      min: 0,
      max: 100,
      required: true,
    },

    flavor_percents: {
      type: 'array',
      isPercent: true,
      required: true
    },

    dilutant: {
      type: 'integer',
      defaultsTo: 0,
      min: 0,
      max: 100
    },

    steep_time: {
      type: 'integer',
      defaultsTo: 0
    },

    description: {
      type: 'string',
      defaultsTo: ''
    },

    tags: {
      type: 'array',
      defaultsTo: []
    },

    image_url: {
      type: 'url',
      defaultsTo: ''
    },

    category: {
      type: 'string',
      enum: [
        'Tobacco',
        'Dessert',
        'Fruit',
        'Candy',
        'Food',
        'Beverage',
        'Other'
      ],
      defaultsTo: 'Other'
    },

    likes: {
      collection: 'user',
      via: 'liked_recipes'
    },

    dislikes: {
      collection: 'user',
      via: 'disliked_recipes'
    },

    saves: {
      collection: 'user',
      via: 'saved_recipes'
    },

    views: {
      type: 'integer',
      defaultsTo: 0
    }

  },


  beforeCreate: function(recipe, cb) {

    if( recipe.flavors.length != recipe.flavor_percents.length ){
      return cb( "There must be a flavor percentage for every flavor in the recipe" );
    }

    recipe.likes = [];
    recipe.dislikes = [];
    recipe.saves = [];
    recipe.views = 0;
    cb(null, recipe);

  },

  types: {
    isPercent: function(value){

      var isValid = true;

      _.each( value , ( item ) => {
        if( item < 0 || item > 100 ){
          isValid = false;
        }
      });

      return isValid;
    }
  }
};
