const Sequelize = require('sequelize')

const sequelize = new Sequelize('database', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
})

module.exports = sequelize
