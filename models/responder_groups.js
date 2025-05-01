const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Responder_Groups extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }

  Responder_Groups.init(
    {
      _id: { 
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      group_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      organization_Id: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Organizations', 
            key: '_id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      group_members: {
        type: DataTypes.JSON,
        allowNull: true
      }
    },
    {
      sequelize,
      timestamps: true,
      tableName: "Responder_Groups",
    }
  );
  Responder_Groups.associate = (models) => {
    Responder_Groups.belongsTo(models.Organizations, { foreignKey: 'organization_Id' });
  }
  return Responder_Groups;
};
