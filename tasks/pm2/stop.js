var utils = require('shipit-utils');

module.exports = function(gruntOrShipit) {
  var task = function() {
    var shipit = utils.getShipit(gruntOrShipit);

    var confFile = (shipit.config.pm2.configPath || shipit.config.deployTo + '/shared/config/pm2') + '/' + shipit.environment + '.json';
    shipit.remote('pm2 stop ' + confFile)
    .catch(function(err,b) {
      shipit.log(err);
    })
  };

  utils.registerTask(gruntOrShipit,'pm2:stop',task);
};