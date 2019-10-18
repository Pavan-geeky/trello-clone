const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const UserRole = sequelize.define('user_role', {
     id: {
          type: Sequelize.INTEGER,
          primaryKey: true
     },
     user_id: {
          type: Sequelize.STRING
     },
     role_id: {
          type: Sequelize.INTEGER
     }
}, {
     //options
});

module.exports = UserRole