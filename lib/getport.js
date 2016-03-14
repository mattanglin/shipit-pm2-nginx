var utils = require('shipit-utils');
var _ = require('lodash');
// var chalk = require('chalk');
var Promise = require('bluebird');

module.exports = function(gruntOrShipit) {
  var shipit = utils.getShipit(gruntOrShipit);

  var portPromise;
  if (shipit.config.port) {
    portPromise = Promise.resolve(shipit.config.port);
  } else {
    // shipit.log(chalk.yellow('Finding open port on servers...'));
    portPromise = shipit.remote('netstat -lntu').then(function(serverResults) {
      var portsInUse = [];

      // We want things that look like :0000
      var regex = /:[0-9]{4}/g;
      for (var i=0; i < serverResults.length; i++) {
        // Extract ports
        var usedPorts = serverResults[i].stdout.match(regex);
        usedPorts = _.map(usedPorts,function(p) {
          return parseInt(p.replace(/:/,''));
        })

        // Add to portsInUse
        portsInUse = _.union(portsInUse,usedPorts);

        // Get available port to use for application
        var port = 8000;
        while (portsInUse.indexOf(port) > -1) {
          port++;
        }
      }

      return port;
    });
  }

  return portPromise;
};
