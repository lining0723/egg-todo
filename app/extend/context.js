module.exports = {
   $success( data = {}, msg = '执行成功!') {
        this.body = {
            code: 0,
            data,
            msg,
        };
    },
    // 失败响应
    $fail ( errCode = 400, msg = 'BAD REQUEST') {
        this.body = {
            code: errCode,
            data: {},
            msg,
        };
    },
    // 错误响应
    $error( error) {
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
        this.body = obj;
        return
    }
};