const { type } = require("os");
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Hers extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }

  Hers.init(
    {
      id: { 
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      code_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organization: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      code_color: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      primary_responders: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      secondary_responders: {
        type: DataTypes.JSON,
        allowNull: true,
      },
      tertory_responders: {
        type: DataTypes.JSON,
        allowNull: true,
      }
    },
    {
      sequelize,
      timestamps: true,
      tableName: "Hers",
    }
  );
  return Hers;
};
