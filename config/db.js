const { Sequelize, DataTypes } = require('sequelize');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

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
  Trigger_hers:require("../models/trigger_hers")(sequelize, DataTypes),
};

// Setup associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
