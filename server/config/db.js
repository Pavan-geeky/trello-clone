const Sequelize = require('sequelize');

const sequelize = new Sequelize('trello', 'root', 'root@12345', {
     host: 'localhost',
     dialect: 'mysql',
     define: {
          timestamps: false
     }
});

module.exports = sequelize;