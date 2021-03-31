/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1616826949701_2742';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  config.security = {   //关闭post请求需要带cookie
    csrf: {
      enable: false,
    },
  };
  config.sequelize = {
    dialect: 'mysql',
    host: '121.5.226.86',
    port: 3306,
    password: '123456',
    database: 'todo',
    timezone: '+08:00', //改为标准时区
    dialectOptions: {
      dateStrings: true,
      typeCast: true
    }
  };
  return {
    ...config,
    ...userConfig,
  };
};
