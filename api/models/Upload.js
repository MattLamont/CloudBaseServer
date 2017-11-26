/**
 * Upload.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    filename: {
      type: 'string',
      required: true
    },

    url: {
      type: 'url',
      required: true
    },

    category: {
      type: 'string',
      required: true,
      enum: [
        'user_image',
        'recipe_image'
      ]
    },

    owner: {
      model: 'user',
      required: true
    }
  }
};
