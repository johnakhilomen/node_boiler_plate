const ConnectMongo = require("../../dbSetups/SetupMongo");

const SomeSchema = ConnectMongo.Schema({
    Fullname: String,
    Emailaddress : String,
    Password : String,
}, {collection:"Some", timestamps : true});

const Some = ConnectMongo.model("Some", SomeSchema);
module.exports = {Some};