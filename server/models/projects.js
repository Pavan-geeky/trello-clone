const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Project = sequelize.define('project', {
     id: {
          type: Sequelize.STRING,
          primaryKey: true
     },
     project_name: {
          type: Sequelize.STRING
     },
     createdAt: {
          type: Sequelize.DATE
     }
}, {
     //options
});

module.exports = Project