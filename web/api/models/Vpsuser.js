/**
 * Vpsuser.js
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
 		ports: {
 			collection: 'port',
 			via: 'vpsroot'
 		},
     user: {
       model: 'user'
     },
     container: {
       model: 'container'
     }
   }
 };
