const ConnectMongo = require("../../dbSetups/SetupMongo");

const UserSchema = ConnectMongo.Schema({
Fullname: {
            type : String,
            required: "Fullname is required",
            minlength: 6, 
            maxlength: 100,
            lowercase: true,
            unique: false,
            },
Emailaddress: {
            type : String,
            required: "Emailaddress is required",
            minlength: 6,
            maxlength: 100,
            lowercase: true,
            trim: true,
            unique: true,
            match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
            },
Password: {
            type : String,
            required: "Password is required",
            minlength: 6,
            maxlength: 100,
            },
}, {collection:"user", timestamps : true});

const User = ConnectMongo.model("User", UserSchema);
module.exports = {User};