//node ./dbSetups/SetupPostgresql.js
const fs = require("fs");
const { Sequelize } = require('sequelize');
const {PostgresDbParameters} = require("../configuration/ConfigParameters");

class SetupPostgresql extends Sequelize
{
    constructor()
    {
        //super('postgres://ywzfulztpkakhk:b1bf24603849950e5ead934083fee44b3af34ed6eb9ed058b50ae17bab9bcc79@ec2-50-19-26-235.compute-1.amazonaws.com:5432/dcprlf6nbc330i?ssl=true&sslfactory=org.postgresql.ssl.NonValidatingFactory');
        super(PostgresDbParameters.DATABASE, PostgresDbParameters.USERNAME, PostgresDbParameters.PASSWORD, {
            host: PostgresDbParameters.HOST,
            dialect: 'postgres',
            dialectOptions: {
                ssl: {
                    rejectUnauthorized: false,
                  },
            }
        })
        this.dbConnect;
        
    }

    dbConnect = async () => {
        try 
        {
            await this.authenticate();
            console.log('Connection has been established successfully.');
        } 
        catch (error) 
        {
            console.error('Unable to connect to the database:', error);
        }
    }
}

(function() {
    let t = new SetupPostgresql();
    t.dbConnect();
})();

module.exports = new SetupPostgresql();
