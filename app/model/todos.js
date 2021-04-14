/*
 * @Description: 
 * @Author: LI NING
 * @Date: 2021-04-09 16:09:57
 * @LastEditTime: 2021-04-14 17:55:29
 * @LastEditors:  
 */
module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Todos = app.model.define('todos',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      openid: {
        allowNull: false,
        type: STRING(50)
      },
      content: {
        type: STRING(255)
      },
      createTime: {
        type: DATE,
        field: "createTime"
      },
      remarks: {
        type: STRING(255)
      },
      status: {
        type: INTEGER(1)
      },
      lever: {
        type: INTEGER(1)
      },
      endTime: {
        type: DATE,
        field: "endTime"
      },
    },
    {
      freezeTableName: true, // Model 对应的表名将与model名相同
      timestamps: false,
    }
  );

  Todos.associate = function () {

  };

  return Todos;
};
