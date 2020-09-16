
const ConnectMongo = require("../../dbSetups/SetupMongo");

const SomeSchema = ConnectMongo.Schema({
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
            match: /^([w-.]+@([w-]+.)+[w-]{2,4})?$/
            },
Password: {
            type : String,
            required: "Password is required",
            minlength: 6,
            maxlength: 100,
            },
Address: {
            type : String,
            required: "Address is required",
            },
Geolocation: {
            type : {},
            required: "Geolocation is required",
            },
}, {collection:"Some", timestamps : true});

const Some = ConnectMongo.model("Some", SomeSchema);
module.exports = {Some};