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
      unique: true
		},
		ports: {
			collection: 'port',
			via:
		},
    user: {
      model: 'user'
    },
    containers: {
      collection: 'container'
      via: 'dockerid'
    },
    mysqlUser: {
      type: 'string',
      required: true
    },
    mysqlPass: {
      type: 'string',
      required: true
    },
    mysqlRootPass: {
      type: 'string',
      required: true
    },
    ftpUser: {
      type: 'string',
      required: true
    },
    ftpPass: {
      type: 'string',
      required: true
    }
  }
};
