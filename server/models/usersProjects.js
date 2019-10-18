const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const userProject = sequelize.define('userProject', {
     user_id: {
          id: Sequelize.STRING
     },
     project_id: {
          type: Sequelize.STRING
     }
}, {
     //options
});

module.exports = userProject