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
      unique: true,
      hexadecimal: true
    },
    active: {
      type: 'boolean',
      defaultsTo: false
    },
    ports: {
      collection: 'port',
      via: 'container'
    }
  },

  afterDestroy: function(destroyedRecords, cb){
    Port.destroy({: _.pluck(destroyedRecords, 'container')}).exec(function(){
      console.log('Containers binded to deleted Webftp have been removed');
      return cb();
  }
};
