var utils = require('shipit-utils');
var Promise = require('bluebird');

module.exports = function(gruntOrShipit) {

  var task = function() {
    console.log('in portscan task...');
    // Does this need to be a task or not?
  };

  // utils.registerTask(gruntOrShipit,'portscan:find-port',task);


};
