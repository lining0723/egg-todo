const Controller = require('egg').Controller;

const wxConfig = {
  appid: 'wxbccf1273eb88b291',
  appSecret: '10ebf8ec1f891180713899940602d5f7'
}

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.$success({ message: 'hi todo' })
  }

  // 获取用户openid
  // 通过 wx.login 接口获得临时登录凭证 code 后传到开发者服务器调用此接口完成登录流程
  async getOpenid() {
    const { ctx } = this;
    const urlStr = 'https://api.weixin.qq.com/sns/jscode2session'
    const data = {
      appid: wxConfig.appid,           // 小程序 appId
      secret: wxConfig.appSecret,      // 小程序 appSecret
      js_code: ctx.request.body.code,         // 登录时获取的 code
      grant_type: 'authorization_code' // 授权类型，此处只需填写 authorization_code
    }
    try {
      const result = await ctx.curl(urlStr, {
        data: data,
        dataType: 'json',
      });
      ctx.$success(result.data)
    } catch (error) {
      ctx.logger.error(error);
      ctx.$error(error);
    }
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
  async create() {
    const { ctx } = this;
    const params = ctx.request.body;
    try {
      const data = await this.ctx.service.home.create(params)
      ctx.$success(data)
    } catch (error) {
      ctx.logger.error(error);
      ctx.$error(error);
    }
  }
  async update() {
    const { ctx } = this;
    const params = ctx.request.body;
    try {
      const data = await this.ctx.service.home.update(params)
      ctx.$success(data)
    } catch (error) {
      ctx.logger.error(error);
      ctx.$error(error);
    }
  }
  async remove() {
    const { ctx } = this;
    const params = ctx.request.body;
    try {
      const data = await this.ctx.service.home.remove(params)
      ctx.$success(data)
    } catch (error) {
      ctx.logger.error(error);
      ctx.$error(error);
    }
  }
  async sendMsg() {
    const { ctx } = this;
    const params = ctx.request.body;
    try {
      const data = await this.ctx.service.home.sendMsg(params)
      ctx.$success(data)
    } catch (error) {
      ctx.logger.error(error);
      ctx.$error(error);
    }
  }
}

module.exports = HomeController;
