var utils = require('shipit-utils');

module.exports = function(gruntOrShipit) {

  utils.registerTask(gruntOrShipit,'pm2-nginx:init',task);

  function task() {
    var shipit = utils.getShipit(gruntOrShipit);

    console.log('INIT!!!!',shipit.config);

    shipit.config = shipit.config || {};

    shipit.config.pm2 = shipit.config.pm2 || {};

    shipit.config.nginx = shipit.config.nginx || {};

    shipit.pm2_nginx_inited = true;
    shipit.emit('pm2_nginx_inited');
  }

};
