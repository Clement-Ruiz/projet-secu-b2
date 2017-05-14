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
      required: true,
      min: 1500,
      max: 64000
    },
    container: {
      model: 'container',
      required: true
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

  }
};
