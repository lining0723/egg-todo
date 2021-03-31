module.exports = app => {
  const { STRING, INTEGER, DATE } = app.Sequelize;
  const Todos = app.model.define('todos',
    {
      id: {
        type: INTEGER,
        allowNull: false,
        primaryKey: true
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
