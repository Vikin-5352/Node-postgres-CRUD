'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);

// Configuration object for different environments
const config = {
  "development": {
    "username": "user",
    "password": "S3cret",
    "database": "skill_profile_db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": "S3cret",
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "port":"3306"
  },
  "production": {
    "username": "root",
    "password": "S3cret",
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
};

// Determine environment (defaults to 'development' if NODE_ENV is not set)
const env = (process.env.NODE_ENV || 'development').trim(); // Trim whitespace

// Validate selected configuration
const selectedConfig = config[env];
if (!selectedConfig) {
  throw new Error(`Invalid environment '${env}'. Check your NODE_ENV setting.`);
}

// Initialize Sequelize with selected configuration
const sequelize = new Sequelize(selectedConfig.database, selectedConfig.username, selectedConfig.password, {
  port: "3306",
  dialect: selectedConfig.dialect,
  // Add other options as needed, such as port if different from default
});

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error.message);
    process.exit(1); // Exit the process if unable to connect to the database
  });

// Read all models from current directory except test files and load them into Sequelize
const db = {};
fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      !file.includes('.test.js')
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Associate models if they have an associate method
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export Sequelize and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
