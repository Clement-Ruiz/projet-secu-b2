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
      alphanumeric: true,
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
    ftpUser: {
      type: 'string',
      required: true,
      alphanumeric: true,
      minLenght: 5
    },
  },

  afterDestroy: function(destroyedRecords, cb){
    Container.destroy({: _.pluck(destroyedRecords, 'dockerid')}).exec(function(){
      console.log('Containers binded to deleted Webftp have been removed');
      return cb();
    });
  }
};
