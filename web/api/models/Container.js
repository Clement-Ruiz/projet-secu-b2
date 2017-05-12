/**
 * Container.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
const dockerJS = require('mydockerjs').docker;

module.exports = {

  attributes: {
    dockerid: {
      type: 'string',
      unique: true
    },
    active: {
      type: 'boolean',
      defaultsTo: false
    },
    ports: {
      collection: 'ports',
      via: 'container'
    }

  }
};
