/*
 * @Description: 
 * @Author: LI NING
 * @Date: 2021-04-09 17:07:35
 * @LastEditTime: 2021-04-14 17:54:43
 * @LastEditors:  
 */
module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const SendMsg = app.model.define('send_msg',
        {
            id: {
                type: INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            todoId: {
                allowNull: false,
                type: INTEGER,
                field: "todoId"
            },
        },
        {
            freezeTableName: true, // Model 对应的表名将与model名相同
            timestamps: false,
        }
    );

    SendMsg.associate = function () {
        // belongsTo
        app.model.SendMsg.belongsTo(app.model.Todos,
            {
                foreignKey: 'todoId',
                targetKey: 'id',
            })
    };

    return SendMsg;
};
