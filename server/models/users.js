const sequelize = require('../config/db');
const Sequelize = require('sequelize');
const User = sequelize.define('user', {
     id: {
          type: Sequelize.STRING,
          allowNull: false,
          primaryKey: true
     },
     name: {
          type: Sequelize.STRING
     },
     email: {
          type: Sequelize.STRING
     },
     password: {
          type: Sequelize.STRING
     },
     bio: {
          type: Sequelize.STRING
     }
}, {
     //options
});

module.exports = User