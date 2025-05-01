const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Emergency_Contacts extends Model {
    toJSON() {
      return { ...this.get() };
    }
  }

  Emergency_Contacts.init(
    {
      _id: { 
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
      },
      full_name:{
        type: DataTypes.STRING,
        allowNull:false
      },
      role_or_title: {
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
      phone_number: {
        type: DataTypes.BIGINT,
        allowNull: false,
        validate: {
            isNumeric: true, 
          },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      timestamps: true,
      tableName: "Emergency_Contacts",
    }
  );
  Emergency_Contacts.associate = (models) => {
    Emergency_Contacts.belongsTo(models.Organizations, { foreignKey: 'organization_Id' });
  }
  return Emergency_Contacts;
};
