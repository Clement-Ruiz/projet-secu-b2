/**
 * Ports.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    number: {
      type: 'integer',
      min: 56100,
      max: 58000,
      autoIncrement: true
    },
    container: {
      model: 'container',
    },
    webftp: {
      model: 'webftp'
    },
    vpsuser: {
      model: 'vpsuser'
    },
    vpsroot: {
      model: 'vpsroot'
    }
  },
};
