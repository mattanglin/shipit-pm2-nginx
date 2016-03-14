

module.exports = function(shipit) {
  console.log('main index...');
  // require('./tasks/pm2-nginx')(shipit);
  require('./tasks/pm2')(shipit);
  // require('./tasks/nginx')(shipit);
};
