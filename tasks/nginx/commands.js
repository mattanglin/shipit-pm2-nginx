var utils = require('shipit-utils');

module.exports = function(gruntOrShipit) {
  // TODO better nginx usage. Use bin file instead of global  

  var nginxStart = function() {
    // exec start on nginx
    var shipit = utils.getShipit(gruntOrShipit);

    return shipit.remote('sudo service nginx start')
      .then(function() {
        shipit.emit('nginx:start');
      });
  }

  var nginxRestart = function() {
    // exec start on nginx
    var shipit = utils.getShipit(gruntOrShipit);

    return shipit.remote('sudo service nginx restart')
      .then(function() {
        shipit.emit('nginx:restart');
      });
  }

  var nginxReload = function() {
    // exec start on nginx
    var shipit = utils.getShipit(gruntOrShipit);

    return shipit.remote('sudo service nginx reload')
      .then(function() {
        shipit.emit('nginx:reload');
      });
  }

  var nginxStop = function() {
    // exec start on nginx
    var shipit = utils.getShipit(gruntOrShipit);

    return shipit.remote('sudo service nginx stop')
      .then(function() {
        shipit.emit('nginx:stop');
      });
  }

  utils.registerTask(gruntOrShipit,'nginx:start',nginxStart);
  utils.registerTask(gruntOrShipit,'nginx:restart',nginxRestart);
  utils.registerTask(gruntOrShipit,'nginx:reload',nginxReload);
  utils.registerTask(gruntOrShipit,'nginx:stop',nginxStop);
};
