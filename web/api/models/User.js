/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    }
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    webftps: {
      collection: 'webftp',
      via: 'user'
    },
    vpsusers: {
      collection: 'vpsuser',
      via: 'user'
    },
    vpsroots: {
      collection: 'vpsroot',
      via: 'user'
    }

  }
};
