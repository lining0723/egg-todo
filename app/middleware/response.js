module.exports = () => {
    return async function response(ctx, next) {
        ctx.$success = function (ctx, data = {}, msg = '执行成功!') {
            ctx.body = {
                code: 0,
                data,
                msg,
            };
        }
        // 失败响应
        ctx.$fail = function (Context, errCode = 400, msg = 'BAD REQUEST') {
            // const { ctx } = Context;
            Context.body = {
                code: errCode,
                data: {},
                msg,
            };
        }
        // 错误响应
        ctx.$error = function (Context, error) {
            // const { ctx } = Context;
            const obj = {
                code: 500,
                msg: '服务器错误!'
            }
            if (error && error.code == 'invalid_param') {
                obj.code = 422;
                obj.msg = '参数错误!';
            } else if (error.message) {
                obj.code = -1;
                obj.msg = error.message;
            }
            Context.body = obj;
            return
        }
    }
};
