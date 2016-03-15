var utils = require('shipit-utils');
var fs = require('fs');
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

    // Check for port
    if (!shipit.config.port) {
      throw('No port set. Please specify port in shipit config or use pm2:generate to scan for available port.');
    } else {
      // Defaut Settings
      shipit.config.pm2 = shipit.config.pm2 || {};
      shipit.config.pm2.name = shipit.config.pm2.name || shipit.config.name || pkgName || 'my-app';
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

      // Create PM2 configuration
      var pm2ConfFileName = shipit.environment+'.json';
      var pm2ConfFileLocal = shipit.config.workspace+'/'+pm2ConfFileName;
      var pm2JSON = _.extend({env:{PORT:shipit.config.port}},shipit.config.pm2.conf);

      // Write config to local workspace
      fs.writeFileSync(pm2ConfFileLocal,JSON.stringify(pm2JSON,null,2));
        shipit.log('Creating file structure for PM2 config...');
        var destPath = shipit.config.deployTo+'/testpath'; // '/shared/config/pm2'; This should be shipit.config.pm2.configPath
        return shipit.remote('mkdir -p '+destPath)
      .then(function(res) {
        shipit.log('File structure created');
        return res;
      }).then(function(result) {
        shipit.log('Copying PM2 config file to remote servers...');
        return shipit.remoteCopy(pm2ConfFileLocal,destPath);
      }).then(function() {
        shipit.log('Deleting local config file');
        fs.unlink(pm2ConfFileLocal);
      });
    }    
  };


  utils.registerTask(gruntOrShipit,'pm2:generate:conf',task);
  utils.registerTask(gruntOrShipit,'pm2:generate',['pm2-nginx:setport','pm2:generate:conf']);
};