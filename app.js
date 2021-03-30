module.exports = app => {
    // 自定义内容
    app.projectName = 'todo'

    app.beforeStart(async () => {
        // 应用会等待这个函数执行完成才启动
        console.log("==app beforeStart==");
    });
    let response = require('./app/middleware/response')
    app.ready(async () => {
        console.log("==app ready==");
    })
    app.use(response())
    app.beforeClose(async () => {
        console.log("==app beforeClose==");
    })
};
