/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  //const common = middleware.common();
  router.get('/api', controller.home.index);
  router.post('/api/todoList', controller.home.todoList);
  router.post('/api/getOpenid', controller.home.getOpenid);
  router.post('/api/create', controller.home.create);
  router.post('/api/update', controller.home.update);
  router.post('/api/remove', controller.home.remove);
  router.post('/api/sendMsg', controller.home.sendMsg);
};
