const ConnectMongo = require("../../dbSetups/SetupMongo");

const UserSchema = ConnectMongo.Schema({
    Fullname: String,
    Emailaddress : String,
    Password : String,
}, {collection:"users", timestamps : true});

const User = ConnectMongo.model("User", UserSchema);
module.exports = {User};

