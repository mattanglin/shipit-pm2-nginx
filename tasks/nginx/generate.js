var utils = require('shipit-utils');
var fs = require('fs');
var ejs = require('ejs');
var _ = require('lodash');

// Attempt to discover package name in application package.json
var pkgName = false;
try {
  pkgName = require(process.cwd()+'/package.json').name;
} catch(e) {}

module.exports = function(gruntOrShipit) {

  var task = function() {
    var shipit = utils.getShipit(gruntOrShipit);

    if (!shipit.config.port) {
      throw('No port set. Please specify port in shipit config or use nginx:generate to scan for available port.');
    } else {

      shipit.config = shipit.config || {};
      shipit.config.nginx = shipit.config.nginx || {};

      // Set some defaults
      shipit.config.nginx.name = shipit.config.nginx.name || shipit.config.name || pkgName || 'my-app';
      shipit.config.nginx.port = shipit.config.port;
      shipit.config.nginx.servername = shipit.config.nginx.servername || 'localhost';
      shipit.config.nginx.host = shipit.config.nginx.host || 'http://127.0.0.1';
      shipit.config.nginx.nginx_location = shipit.config.nginx.nginx_location || '/etc/nginx';

      // var template
      var template;
      try {
        // Check for custom template first
        template = fs.readFileSync(process.cwd() + '/config/nginx/nginx.conf.ejs','utf8');
      } catch(err) {
        // Get template from module
        template = fs.readFileSync(__dirname + '/../../templates/nginx.conf.ejs','utf8');
      }
      
      // Render conf
      var nginxData = ejs.render(template, {nginx: shipit.config.nginx});

      // Write nginx conf data to workspace
      var nginxConfFileName = _.join([shipit.config.nginx.name.replace(/[^a-z0-9]+/g,'_'),shipit.environment],'_');
      var nginxConfFileLocal = shipit.config.workspace+'/'+nginxConfFileName;
      
      shipit.log('Writing Nginx conf to workspace');
      fs.writeFileSync(nginxConfFileLocal,nginxData);
      shipit.log('Copying Nginx conf to remote servers');
      // Copy file to remote server
      shipit.remoteCopy(nginxConfFileLocal,shipit.config.nginx.nginx_location + '/sites-available')
        .then(function() {
          shipit.log('Linking Nginx conf to sites-enabled');
          // Link it
          return shipit.remote('sudo ln -s '+shipit.config.nginx.nginx_location+'/sites-available/'+nginxConfFileName + ' ' + shipit.config.nginx.nginx_location + '/sites-enabled/');
        }).then(function() {
          shipit.log('Deleting local conf from workspace');
          // Delete local file
          fs.unlink(nginxConfFileLocal);
        });

    }

  }

  utils.registerTask(gruntOrShipit,'nginx:generate:conf',task)
  utils.registerTask(gruntOrShipit,'nginx:generate',['pm2-nginx:setport','nginx:generate:conf']);
};
