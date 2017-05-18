/**
 * WebftpController
 *
 * @description :: Server-side logic for managing webftps
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var passwordGenerator = require('password-generator');

var Docker = require('dockerode');
var docker = new Docker({socketPath: '/var/run/docker.sock'});

module.exports = {

  add: function(req, res){
    console.log('Webftp Creation : User '+req.session.user.email);
    var webftp = {
      name: req.param("name"),
      user: req.session.user,
      ports: [],
      containers: []
    }
    for (var i = 0; i < 3; i++) {
      Port.create().exec(function(err, port){
        if(err){
          console.log('Webftp creation : port creation failed /!\\');
          console.log(err);
          return res.view('500');
        }
        if(port){
          return webftp.ports.add(port);
        }
      });
    }
    console.log('Webftp creation : Ports OK');

    var configDB = {
      port: webftp.ports[0],
      user: req.session.user.lastName+'-'+webftp.name,
      password: passwordGenerator(12, false),
      databse: req.session.user.lastName+'-'+webftp.name
    }
    console.log(configDB);
    Container.newDatabase(configDB).exec(function(err, container){
      if(err){
        console.log('Webftp creation : Database container creation failed');
        console.log(err);
        return res.view('500');
      }
      if(container){
        webftp.mysqlUser = configDB.user;
        return webftp.containers.add(container);
      }
    });

    var configFTP = {
      port: webftp.ports[1],
      user: req.session.user.id+webftp.name,
      password: passwordGenerator(12, false),
      databse: req.session.user.id+webftp.name
    }
    console.log(configFTP);
    Container.newFTP(configFTP).exec(function(err, container){
      if(err){
        console.log('Webftp creation : FTP container creation failed');
        console.log(err);
        return res.view('500');
      }
      if(container){
        webftp.ftpUser = configFTP.user;
        return webftp.containers.add(container);
      }
    });

    Container.newApache(webftp.ports[2]).exec(function(err, container){
      if(err){
        console.log('Webftp creation : Apache container creation failed');
        console.log(err);
        return res.view('500');
      }
      if(container){
        return webftp.containers.add(container);
      }
    });

    var returnData = {
      service: webftp,
      credentials: {
        mysqlPass: configDB.password,
        mysqlDatabase: configDB.databse,
        ftpPass: configFTP.password
      }
    };
    console.log(returnData);



  },

  reset: function(req, res){

  },

  enable: function(req, res){

  },

  disable: function(req, res){

  },

  destroy: function(req, res){

  }
  };
