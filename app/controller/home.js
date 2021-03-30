'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
      async userInfo() {
        const { ctx } = this;
        const params = ctx.request.body;
        try {
            const data = await this.ctx.service.common.userInfo(params)
            ctx.$success(data)
        } catch (error) {
            ctx.logger.error(error);
            ctx.$error(error);
        }
    }
}

module.exports = HomeController;
