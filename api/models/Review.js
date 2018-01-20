/**
 * Review.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    owner: {
      model: 'user',
      required: true
    },

    recipe: {
      model: 'recipe',
      required: true
    },

    rating: {
      type: 'integer',
      min: 0,
      max: 5,
      required: true,
    },

    title: {
      type: 'string',
      maxLength: 200,
      defaultsTo: ''
    },

    description: {
      type: 'string',
      maxLength: 1000,
      defaultsTo: ''
    }
  }
};
