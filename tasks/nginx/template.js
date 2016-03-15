var utils = require('shipit-utils');
var mkdirp = require('mkdirp').sync;
var fs = require('fs');

module.exports = function(gruntOrShipit) {

  var task = function() {
    // TODO: Check if the config exists and prompt for overwite
    var shipit = utils.getShipit(gruntOrShipit);

    var destPath = process.cwd()+'/config/nginx/';
    var destFile = destPath + 'nginx.conf.ejs';
    var srcFile = __dirname + '/../../templates/nginx.conf.ejs';

    // Create file structure for custom config
    mkdirp(destPath);

    // Copy the template file from the module to the project config for editing
    fs.createReadStream(srcFile).pipe(fs.createWriteStream(destFile));
  }

  utils.registerTask(gruntOrShipit,'nginx:template',task);
};
