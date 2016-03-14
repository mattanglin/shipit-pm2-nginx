var utils = require('shipit-utils');
var getport = require('../../lib/getport');

module.exports = function(gruntOrShipit) {
  console.log('PM2!');
  

  var pm2StartOrRestart = function() {
    var shipit = utils.getShipit(gruntOrShipit);
    console.log('PM2 CONFIG:',shipit.config.pm2);
  }

  var pm2Stop = function() {
    var shipit = utils.getShipit(gruntOrShipit);
  }

  var pm2GenerateConfig = function() {
    var shipit = utils.getShipit(gruntOrShipit);

    // Check if we need to grab an open port or if in config
  }

  // Register Tasks
  utils.registerTask(gruntOrShipit,'pm2:start',pm2StartOrRestart);
  utils.registerTask(gruntOrShipit,'pm2:restart',pm2StartOrRestart);
  utils.registerTask(gruntOrShipit,'pm2:stop',pm2Stop);
  utils.registerTask(gruntOrShipit,'pm2:generate',pm2GenerateConfig);
}