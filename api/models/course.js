'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Course extends Model {
    static associate(models) {
      Course.belongsTo(models.User, {
        foreignKey: 'userId'
      });
    }
  }

  Course.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title cannot be empty" },
        }
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Description cannot be empty" }
        }
      },
      estimatedTime: DataTypes.STRING,
      materialsNeeded: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',  // This should match the table name, so likely 'Users'
          key: 'id'
        },
      }
    },
    {
      sequelize,
      modelName: 'Course',
      tableName: 'Courses'  // <-- force Sequelize to use this table name
    }
  );

  return Course;
};