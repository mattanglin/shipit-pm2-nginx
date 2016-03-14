var utils = require('shipit-utils');
var fs = require('fs');
var _ = require('lodash');

module.exports = function(gruntOrShipit) {

  var task = function() {
    var shipit = utils.getShipit(gruntOrShipit);

    // Check for merged configuration?
    if (!shipit.pm2_inited) {
      throw('Do not run the pm2:generate:conf task directly. The pm2:init task must be run before. Try running pm2:generate instead.');
    } else {
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
};