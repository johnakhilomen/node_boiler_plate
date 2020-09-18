const ServerParameters = {
    PORT : 8000,
    "dbURI": "mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
};

const DbParameters = {
    TYPE : "MONGO", //POSTGRES || MYSQL
    PORT : 8000,
    "dbURI": "mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
};

const PostgresDbParameters = {
    TYPE : "POSTGRES",
    PORT : 8000,
    HOST: 'ec2-50-19-26-235.compute-1.amazonaws.com',
    DATABASE : "dcprlf6nbc330i",
    USERNAME : "ywzfulztpkakhk",
    PASSWORD : "b1bf24603849950e5ead934083fee44b3af34ed6eb9ed058b50ae17bab9bcc79"
};

module.exports = {DbParameters, ServerParameters, PostgresDbParameters};