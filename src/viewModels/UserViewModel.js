const {User} = require("../models/UserModel");
const bcrypt = require("bcrypt");

class UserViewModel {
    _userModel;
    constructor(user)
    {
        this._user = user;
    }
    
    Create = (callback) => {
        const modelLocal = this._user;
        bcrypt.genSalt(10, function(err, salt) {
            if(err) 
                {
                   console.log(err)
                }
                const model = new User(modelLocal);
            bcrypt.hash(model.Password, salt, function(err, hash) {
                model.Password = hash;
                model.save(callback);
            });
        });
    }
    
    GetById = (id, callback) => {
        var query = {"_id": id};
        User.findOne(query, callback);
    }
   
}

module.exports = {UserViewModel};
