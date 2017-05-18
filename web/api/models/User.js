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
      unique: true,
      email: true
    },
    password: {
      type: 'string',
      required: true,
    //  password: true
    },
    firstName: {
      type: 'string',
      required: true,
      regex: /^[a-zA-Z -']+$/
    },
    lastName: {
      type: 'string',
      required: true,
      regex: /^[a-zA-Z -']+$/
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
  },

  afterDestroy: function(destroyedRecords, cb){
    Webftp.destroy({user: _.pluck(destroyedRecords, 'id')}).exec(function(){
      console.log('Webtfps binded to deleted users have been removed');
    });
    Vpsuser.destroy({user: _.pluck(destroyedRecords, 'id')}).exec(function(){
      console.log('Vpsusers binded to deleted users have been removed');
    });
    Vpsroot.destroy({user: _.pluck(destroyedRecords, 'id')}).exec(function(cb){
      console.log('Vpsroots binded to deleted users have been removed');
      return cb();
    });
  }

};
