var utils = require('shipit-utils');

module.exports = function(gruntOrShipit) {
  var shipit = utils.getShipit(gruntOrShipit);
  
  require('./tasks/setport')(gruntOrShipit);
  require('./tasks/pm2')(gruntOrShipit);
  require('./tasks/nginx')(gruntOrShipit);

  // Create tasks
  utils.registerTask(gruntOrShipit,'pm2-nginx:generate',['pm2:generate:config','nginx:generate:config']);
  utils.registerTask(gruntOrShipit,'server:setup',['pm2-nginx:setport','pm2-nginx:generate']);
  utils.registerTask(gruntOrShipit,'server:restart',['pm2:restart','nginx:restart']);

  // Restart Server after deploy
  shipit.on('deployed',function() {
    shipit.start(['server:restart']);
  });
};
