const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Locations extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }

  Locations.init(
    {
      _id: { 
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
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
      location_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      tableName: "Locations",
    }
  );
  Locations.associate = (models) => {
    Locations.belongsTo(models.Organizations, { foreignKey: 'organization_Id' });
    Locations.hasMany(models.Departments_or_Rooms, { foreignKey: 'locations_Id', onDelete: 'CASCADE' });

  }
  return Locations;
};
 