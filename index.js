module.exports = function(shipit) {
  require('./tasks/pm2-nginx')(shipit);
});
