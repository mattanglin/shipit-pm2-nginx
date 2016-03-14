var utils = require('shipit-utils');

module.exports = function(gruntOrShipit) {
  var shipit = utils.getShipit(gruntOrShipit)


  // Set defaults
  console.log('setting defaults:',gruntOrShipit.config);

  require('./init')(gruntOrShipit);
  require('./port')(gruntOrShipit);
  require('./pm2')(gruntOrShipit);
  require('./nginx')(gruntOrShipit);

  // Register tasks ???

  // PM2 Tasks
  // utils.registerTask(gruntOrShipit,'portscan',['portscan:find-port']);
}