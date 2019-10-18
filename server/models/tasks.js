const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const Task = sequelize.define('task', {
     id: {
          id: Sequelize.STRING,
          primaryKey: true
     },
     name: {
          type: Sequelize.STRING
     },
     start_date: {
          type: Sequelize.DATE
     },
     end_date: {
          type: Sequelize.DATE
     },
     notes: {
          type: Sequelize.STRING
     },
     status: {
          type: Sequelize.STRING
     },
     project_id: {
          type: Sequelize.STRING
     }
}, {
     //options
});

module.exports = Task