'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const common = middleware.common();
  router.get('/', common, controller.home.index);
};
