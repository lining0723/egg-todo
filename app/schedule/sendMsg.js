module.exports = {
    schedule: {
        interval: '1m', // 1 分钟间隔
        type: 'all', // 指定所有的 worker 都需要执行
    },
    async task(ctx) {
        const { ctx } = this;
        const list = await ctx.model.Todos.findAll({
            order: [['id', 'desc']],
        });
        const urlStr = 'https://api.weixin.qq.com/sns/jscode2session'
        const data = {
            appid: wxConfig.appid,           // 小程序 appId
            secret: wxConfig.appSecret,      // 小程序 appSecret
            js_code: ctx.request.body.code,         // 登录时获取的 code
            grant_type: 'authorization_code' // 授权类型，此处只需填写 authorization_code
        }
        const res = await ctx.curl(urlStr, {
            data: data,
            dataType: 'json',
        });
    },
};
