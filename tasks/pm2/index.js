var utils = require('shipit-utils');

module.exports = function(gruntOrShipit) {
  var shipit = utils.getShipit(gruntOrShipit);

  require('./init')(gruntOrShipit);
  require('./start-or-restart')(gruntOrShipit);
  require('./stop')(gruntOrShipit);
  require('./generate')(gruntOrShipit);

  utils.registerTask(gruntOrShipit,'pm2:generate',['pm2:init','pm2:generate:conf']);
};

