var utils = require('shipit-utils');

module.exports = function(gruntOrShipit) {
  var shipit = utils.getShipit(gruntOrShipit);

  // Set default config here

  require('./start-or-restart')(gruntOrShipit);
  require('./stop')(gruntOrShipit);
  require('./generate')(gruntOrShipit);
};

