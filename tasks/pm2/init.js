var utils = require('shipit-utils');
var getport = require('../../lib/getport');
var _ = require('lodash');
// Attempt to discover package name in application package.json
var pkgName = false;
try {
  pkgName = require(process.cwd()+'/package.json').name;
} catch(e) {}

module.exports = function(gruntOrShipit) {

  var task = function() {
    var shipit = utils.getShipit(gruntOrShipit);

    shipit.config = shipit.config || {};

    // Defaut Settings
    shipit.config.pm2 = shipit.config.pm2 || {};
    shipit.config.pm2.name = shipit.config.pm2.name || pkgName || 'my-app';
    shipit.config.pm2.configPath = shipit.config.pm2.configPath || shipit.config.deployTo + '/shared/config/pm2';
    var defaultAppJSON = {
      name: shipit.config.pm2.name,
      script: 'app.js',
      watch: false,
      env: {
        NODE_ENV: shipit.environment
      }
    };
    shipit.config.pm2.conf =  _.extend(defaultAppJSON,shipit.config.pm2.appJSON || {});

    // Set Port
    return getport(gruntOrShipit).then(function(port) {
      shipit.config.port = port;

      shipit.pm2_inited = true;
      shipit.emit('pm2_inited');
    });
  };


  utils.registerTask(gruntOrShipit,'pm2:init',task);
};

