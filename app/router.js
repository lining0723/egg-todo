/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  //const common = app.middleware.common();
  router.get('/', controller.home.index);
  router.post('/todoList', controller.home.todoList);
};
