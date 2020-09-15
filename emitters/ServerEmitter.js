const EventEmitter = require("events");

class ServerEmitter extends EventEmitter
{
    constructor()
    {
        super();
    }

    emitData(data)
    {
        this.emit("data", data)
    }
    emitListener()
    {
        this.on("data", (data)=> {
            console.log(data);
        })
    }
}

module.exports = new ServerEmitter();