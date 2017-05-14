/**
 * Webftp.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
			type: 'string',
			required: true,
      unique: true,
      alphanumericdashed: true,
      minLenght: 5
		},
		ports: {
			collection: 'port',
			via: 'webftp'
		},
    user: {
      model: 'user'
    },
    containers: {
      collection: 'container',
      via: 'dockerid'
    },
    mysqlUser: {
      type: 'string',
      required: true,
      unique: true,
      alphanumeric: true,
      minLenght: 5
    },
    mysqlPass: {
      type: 'string',
      required: true,
      password: true
    },
    ftpUser: {
      type: 'string',
      required: true,
      alphanumeric: true,
      minLenght: 5
    },
    ftpPass: {
      type: 'string',
      required: true,
      password: true
    }
  },

  types: {
    password: function(value) {
      // For all creates/updates of `User` records that specify a value for an attribute
      // which declares itself `type: 'password'`, that value must:
      // • be a string
      // • be at least 8 characters long
      // • contain at least one number
      // • contain at least one letter
      return _.isString(value) && value.length >= 8 && value.match(/[a-z]/i) && value.match(/[0-9]/);
    }
  }
};
