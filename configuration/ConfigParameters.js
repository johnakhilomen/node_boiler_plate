const ServerParameters = {
    PORT : 8000,
    "dbURI": "mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
};

const DbParameters = {
    TYPE : "MONGO", //POSTGRES || MYSQL
    PORT : 8000,
    "dbURI": "mongodb://localhost:27017/test?readPreference=primary&appname=MongoDB%20Compass&ssl=false",
};

module.exports = {DbParameters, ServerParameters};