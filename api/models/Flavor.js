/**
 * Flavor.js
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

    manufacturer: {
      type: 'string',
      required: true
    },

    link: {
      type: 'url',
      required: true
    },

    image_url: {
      type: 'url',
      defaultsTo: ''
    },

    description: {
      type: 'string',
      defaultsTo: 'None'
    },

    likes:{
      type: 'integer',
      defaultsTo: 0
    },

    dislikes:{
      type: 'integer',
      defaultsTo: 0
    },

    category:{
      type: 'string',
      defaultsTo: ''
    },
  }
};
