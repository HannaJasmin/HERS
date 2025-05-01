const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Departments_or_Rooms extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }

  Departments_or_Rooms.init(
    {
      _id: { 
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      department_or_room_name:
      { 
        type: DataTypes.STRING,
        allowNull:false,
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
     locations_Id: {
        type: DataTypes.STRING,
        allowNull:false,
        references: {
            model: 'Locations',
            key: '_id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
     }
    },
    {
      sequelize,
      timestamps: true,
      tableName: "Departments_or_Rooms",
    }
  );
  Departments_or_Rooms.associate = (models) => {
    Departments_or_Rooms.belongsTo(models.Organizations, { foreignKey: 'organization_Id' });
    Departments_or_Rooms.belongsTo(models.Locations, { foreignKey: 'locations_Id'});
  }
  return Departments_or_Rooms;
};
