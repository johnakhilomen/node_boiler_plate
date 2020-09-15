const ConnectMongo = require("../dbSetups/SetupMongo");

class Config {
    
    dbType;
    constructor(dbType){
        this.dbType = dbType;
    }

    SetupDB = () => {
        
        switch(this.dbType)
        {
            case "MONGO":
                ConnectMongo;
            break;
            default:
            break;
        }
    }
}

module.exports = Config;