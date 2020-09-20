const {PostgreSqlConnectionOject} = require("../../../dbSetups/SetupPostgresql");
const Sequelize = require('sequelize')

let UserModel = (sequelize, type) => {
    return sequelize.define('User', {
        id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: type.STRING
    })
}

User = UserModel(PostgreSqlConnectionOject, Sequelize)
module.exports = {User};