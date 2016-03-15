var utils = require('shipit-utils');

module.exports = function(gruntOrShipit) {
  var shipit = utils.getShipit(gruntOrShipit);

  require('./generate')(gruntOrShipit);
  require('./template')(gruntOrShipit);
  require('./commands')(gruntOrShipit);

  utils.registerTask(gruntOrShipit,'nginx:generate',['pm2-nginx:setport','nginx:generate:conf']);
};

