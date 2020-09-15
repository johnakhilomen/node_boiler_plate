const mongoose = require("mongoose");
mongoose.Promise =  global.Promise;
mongoose.set('debug', true);
const {DbParameters} = require("../configuration/ConfigParameters");
const ServerEmitter = require("../emitters/ServerEmitter");

class ConnectMongo extends mongoose.Mongoose
{
    connectionOptions = { 
        useNewUrlParser: true, 
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
        keepAlive: true, 
        keepAliveInitialDelay: 300000  
    }

    constructor()
    {
        super();
        this.connect(DbParameters.dbURI, this.connectionOptions);
        this.connection.once('open', function () {
            console.log('Mongoose connection is open');
            ServerEmitter.emitData("Mongo connection is open");
        }); 
        this.connection.on('connected', function () {
            console.log('Mongoose default connection connected on ' + DbParameters.dbURI);
            ServerEmitter.emitData("Mongo Connected");
        }); 
        this.connection.on('error',function (err) { 
            console.log('Mongoose default connection error: ' + err);
        }); 
        this.connection.on('disconnected', function () { 
            console.log('Mongoose default connection disconnected'); 
            ServerEmitter.emitData("Mongo DisConnected");
        });
        process.on('SIGINT', function() {   
            console.log('Mongoose default connection disconnected through app termination'); 
            process.exit(0); 
        }); 
    }
   
}

module.exports = new ConnectMongo();