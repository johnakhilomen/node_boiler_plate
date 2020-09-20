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
            },
            pool: {
                max: 10,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        })
        this.dbConnect;
        
       
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
/*const BlogTag = sequelize.define('blog_tag', {})
const Blog = BlogModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)

Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
Blog.belongsTo(User);*/


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

/*(function() {
    let t = new SetupPostgresql();
    t.dbConnect();
})();*/

const PostgreSqlConnectionOject = new SetupPostgresql();
/*PostgreSqlConnectionOject.sync({ force: true })
  .then(() => {
    console.log(`Database & tables created!`)
  })*/
module.exports = {PostgreSqlConnectionOject}