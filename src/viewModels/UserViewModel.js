const bcrypt = require("bcrypt");
const {User} = require("../models/UserModel");

class UserViewModel {
    _userModel;
    constructor(userModel)
    {
        this._userModel = userModel;
    }
    CreateUser = (callback) => {
        const userModelLocal = this._userModel;
        bcrypt.genSalt(10, function(err, salt) {
            if(err) 
                {
                   console.log(err)
                }
                const user = new User(userModelLocal);
                //console.log(user);
            bcrypt.hash(user.Password, salt, function(err, hash) {
                user.Password = hash;
                user.save(callback);
            });
        });
    }
    
    GetUserByEmail = (email, callback) =>
    {
        var query = {"Emailaddress": email};
        UserDetail.findOne(query, callback);
    }
    
    GetUserById = (id, callback) => {
        var query = {"_id": id};
        console.log(query);
        UserDetail.findOne(query, callback);
    }
    
    ComparePassword = (candidatePassword, hash, callback) => {
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if(err) 
            {
                console.log(err);
            };
            callback(null, isMatch);
        });
    }

}

module.exports = {UserViewModel};