# shipit-pm2-nginx

Tasks for [Shipit](https://github.com/shipitjs/shipit) for configuring and running [pm2](https://github.com/Unitech/pm2) and Nginx.

Based on the Capistrano plugin [capistrano-unicorn-nginx](https://github.com/capistrano-plugins/capistrano-unicorn-nginx).

**Features:**

 - Generate PM2 app config and Nginx Server Config
 - Port scanner finds open port on servers
 - Triggered on `deployed` event from [shipit-deploy](https://github.com/shipitjs/shipit-deploy)

**Roadmap**

 - Add SSL configuration for Nginx

## Install

```
npm install shipit-pm2-nginx
```

## Usage

### Example `shipitfile.js`

```js
module.exports = function(shipit) {
  require('shipit-deploy')(shipit);
  require('shipit-pm2-nginx')(shipit);

  shipit.initConfig({
    default: {
      name: 'example-app',
      nginx: {
        servername: 'example-app.com',
      },
      pm2: {
        conf: {
          watch: true,
          script: 'bin/www'
        }
      },
      // port: 1337, // Set to override portscanning
    }
  });
}
```

### PM2 & Nginx configuration

Run the following command to generate Nginx and PM2 configurations on your remote servers.

```
shipit staging server:setup
```

or you can run the tasks separately:

```
shipit staging nginx:generate
shipit staging pm2:generate
```

### PM2 & Nginx restart

To trigger PM2 application and Nginx restart on the `deployed` event, you can simply deploy:
```
shipit staging deploy
```

### Other Tasks

The following PM2 and Nginx tasks are also provided to intereact with your remote servers

```
  shipit staging server:restart

  shipit staging pm2:start
  shipit staging pm2:restart
  shipit staging pm2:stop

  shipit staging nginx:start
  shipit staging nginx:restart
  shipit staging nginx:reload
  shipit staging nginx:stop
```

## Nginx Template Generation

The default Nginx config is a simple port proxy. You can generate and edit the Nginx config [ejs]() template as follows:

```
shipit environment-does-not-matter nginx:template
```

This will create `config/nginx/nginx.conf.ejs` for use during Nginx conf generation.

## Options

### name

Type: `String`

Define the name of your application. This is used for naming your Nginx conf as well as your PM2 process name. You can override this variable as necessary in `pm2.name` as well as `nginx.name`. If you omit this option the module will do its best to locate your `package.json` and infer application name from there.

### port

Type: `Integer`

Define the port your application will run on for PM2 and Nginx configurations. Omitting this option will trigger a remote portscan starting at port `8000` on your remote servers.


### nginx.servername

Type: `String`
Default: `localhost`

Servername field for your applications Nginx configuration file.

### nginx.host

Type: `String`
Default: `http://127.0.0.1`

Default host for Nginx port proxy.

### nginx.nginxLocation

Type: `String`
Default: `/etc/nginx`

Location on remote servers for Nginx `sites-available` and `sites-enabled` folders.


### pm2.configPath

Type: `String`
Default: `shipit.config.deployTo + '/shared/config/pm2'`

Where to store your PM2 application declaration on remote servers. The default location does not require the use of [shipit-shared](https://github.com/timkelty/shipit-shared), but adheres to the file structure it creates.

### pm2.conf

Type: `Object`
Default: 
```
{
  name: shipit.config.pm2.name,
  script: 'app.js',
  watch: false,
  env: {
    NODE_ENV: shipit.environment,
  }
}
```

PM2 application declaration file. Override any values according to the [PM2 application declaration options](http://pm2.keymetrics.io/docs/usage/application-declaration/). `NODE_ENV` will automatically be set from your shipit environment and `PORT` will be set according to your shipit configuration.


## License

MIT
