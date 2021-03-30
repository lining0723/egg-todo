const Service = require('egg').Service;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
class HomeService extends Service {
    async todoList(param) {
        const { app } = this
        let { _openid } = param
        let data = app.model.Todos.findAll({
            // where: {
            //     _openid: ''
            // }
        });
        return data;
    }
}

module.exports = HomeService
