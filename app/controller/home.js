const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;

    ctx.$success()
  }

  async todoList() {
    const { ctx } = this;
    const params = ctx.request.body;
    try {
      const data = await this.ctx.service.home.todoList(params)
      ctx.$success(data)
    } catch (error) {
      ctx.logger.error(error);
      ctx.$error(error);
    }
  }
}

module.exports = HomeController;
