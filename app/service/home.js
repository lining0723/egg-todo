import { Service } from 'egg';
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
export default class CommonService extends Service {

    async getUserList(param) {
        const { app } = this
        let { name } = param
        let data = app.model.UserList.findAll({
            where: {
                userName: {
                    [Op.substring]: name
                },
            }
        });
        return data;
    }
}

module.exports = CommonService