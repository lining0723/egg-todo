/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  //const common = middleware.common();
  router.get('/', controller.home.index);
  router.post('/todoList', controller.home.todoList);
  router.post('/getOpenid', controller.home.getOpenid);
  router.post('/create', controller.home.create);
  router.post('/update', controller.home.update);
  router.post('/remove', controller.home.remove);
};
