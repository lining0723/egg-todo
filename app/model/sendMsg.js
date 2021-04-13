module.exports = app => {
    const { STRING, INTEGER, DATE } = app.Sequelize;
    const SendMsg = app.model.define('send_msg',
        {
            id: {
                type: INTEGER,
                allowNull: false,
                primaryKey: true
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
