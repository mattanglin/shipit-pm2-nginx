var utils = require('shipit-utils');

module.exports = function(gruntOrShipit) {
  var shipit = utils.getShipit(gruntOrShipit);
  // Set Default configs

  console.log('INIT!',shipit.config);
}
