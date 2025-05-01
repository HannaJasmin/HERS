const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Organizations extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }

  Organizations.init(
    {
      _id: { 
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      organization_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      organization_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM('Active','Inactive'),
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "Organizations",
    }
  );
  Organizations.associate = (models) => {
    Organizations.hasMany(models.Locations, { foreignKey: 'organization_Id', onDelete: 'CASCADE' });
        };
  return Organizations;
};
