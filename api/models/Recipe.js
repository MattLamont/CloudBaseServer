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
      required: true,
      dominant: true
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

    likes_count: {
      type: 'integer',
      defaultsTo: 0
    },

    dislikes: {
      collection: 'user',
      via: 'disliked_recipes'
    },

    dislikes_count: {
      type: 'integer',
      defaultsTo: 0
    },

    saves: {
      collection: 'user',
      via: 'saved_recipes'
    },

    saves_count: {
      type: 'integer',
      defaultsTo: 0
    },

    reviews: {
      collection: 'review',
      via: 'recipe'
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

    /*
    if( recipe.likes ){
      delete recipe.likes;
    }

    if( recipe.dislikes ){
      delete recipe.dislikes;
    }

    if( recipe.saves ){
      delete recipe.saves;
    }

    if( recipe.views ){
      delete recipe.views;
    }
    */
    cb(null, recipe);

  },

  beforeUpdate: function(recipe, cb) {

    if( recipe.flavors && recipe.flavor_percents ){
      if( recipe.flavors.length != recipe.flavor_percents.length ){
        return cb( "There must be a flavor percentage for every flavor in the recipe" );
      }
    }

    if( recipe.likes ){
      delete recipe.likes;
    }

    if( recipe.dislikes ){
      delete recipe.dislikes;
    }

    if( recipe.saves ){
      delete recipe.saves;
    }

    if( recipe.views ){
      delete recipe.views;
    }

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
