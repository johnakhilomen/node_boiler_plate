const {User} = require("../models/UserModel");

class UserViewModel {
    _userModel;
    constructor(user)
    {
        this._user = user;
    }
    Create = (callback) => {
        const modelLocal = this._user;
        const model = new User(modelLocal);
        model.save(callback);
    }
     
    GetById = (id, callback) => {
        var query = {"_id": id};
        User.findOne(query, callback);
    }
   
}

module.exports = {UserViewModel};
