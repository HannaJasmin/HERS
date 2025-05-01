const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const organizations = require('../models/organizations');

require('dotenv').config();

// Your PostgreSQL connection string
const connectionString = process.env.DBSTRING;
const sequelize = new Sequelize(connectionString, {
  dialect: 'postgres',
  logging: false,
  port: 5432,
}); 

sequelize   
  .sync({ alter: true })
  .then(() => console.log('Database & tables created!'))
  .catch(async (err) => {
    console.log('DB Cannot connect: ', err); 
  });

const db = {
  Hers: require("../models/hers")(sequelize, DataTypes),
  Trigger_hers: require("../models/trigger_hers")(sequelize, DataTypes),
  Organizations: require("../models/organizations")(sequelize,DataTypes),
  Locations: require("../models/locations")(sequelize,DataTypes),
  Departments_or_Rooms: require("../models/departments_or_rooms")(sequelize,DataTypes),
  Emergency_Contacts: require("../models/emergency_contacts")(sequelize,DataTypes),
  Responder_Groups: require("../models/responder_groups")(sequelize,DataTypes)
};

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) { 
    db[modelName].associate(db);
  }
});

module.exports = db;
