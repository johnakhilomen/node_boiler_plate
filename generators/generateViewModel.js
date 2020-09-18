//node ./generators/generateViewModel.js --ViewModel UserViewModel 

const path = require("path");
const fullpath = path.join(__dirname, 'models').replace("generators/models", "src/viewModels");
const argv = require('minimist')(process.argv.slice(2));
console.log(argv);
const {ViewModel} = argv;
const extratfromViewModel = ViewModel.replace("ViewModel", "");
const extratfromViewModelInLowerCase = ViewModel.replace("ViewModel", "").toLowerCase();

let fileContent = "";

let createFunction = (extratfromViewModelInLowerCase, usertrue) => {
    if (!usertrue)
    {
        return `
    Create = (callback) => {
        const modelLocal = this._${extratfromViewModelInLowerCase};
        const model = new ${extratfromViewModel}(modelLocal);
        model.save(callback);
    }
    `;
    }
    return `
    Create = (callback) => {
        const modelLocal = this._${extratfromViewModelInLowerCase};
        bcrypt.genSalt(10, function(err, salt) {
            if(err) 
                {
                   console.log(err)
                }
                const model = new ${extratfromViewModel}(modelLocal);
            bcrypt.hash(model.Password, salt, function(err, hash) {
                model.Password = hash;
                model.save(callback);
            });
        });
    }
    `;
}

let comparePasswords = () => {
    return `
    ComparePassword = (candidatePassword, hash, callback) => {
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if(err) 
            {
                console.log(err);
            };
            callback(null, isMatch);
        });
    }
    `
}

let getUserByEmail = () => {
    return `
    GetUserByEmail = function (email, callback)
    {
    var query = {"Login.Emailaddress": email};
	UserDetail.findOne(query, callback);
    }
    `;
}

if (extratfromViewModel.indexOf("User") != -1 || extratfromViewModel.indexOf("User") != -1)
{
    fileContent +=
`const {${extratfromViewModel}} = require("../models/${extratfromViewModel}Model");
const bcrypt = require("bcrypt");

class ${ViewModel} {
    _${extratfromViewModelInLowerCase}Model;
    constructor(${extratfromViewModelInLowerCase})
    {
        this._${extratfromViewModelInLowerCase} = ${extratfromViewModelInLowerCase};
    }
    ${createFunction(`${extratfromViewModelInLowerCase}`, true)}
    GetById = (id, callback) => {
        var query = {"_id": id};
        ${extratfromViewModel}.findOne(query, callback);
    }
   
}

module.exports = {${ViewModel}};
`
}
else
{
    fileContent +=
`const {${extratfromViewModel}} = require("../models/${extratfromViewModel}Model");

class ${ViewModel} {
    _${extratfromViewModelInLowerCase}Model;
    constructor(${extratfromViewModelInLowerCase})
    {
        this._${extratfromViewModelInLowerCase} = ${extratfromViewModelInLowerCase};
    }
    ${createFunction(`${extratfromViewModelInLowerCase}`, false)}
    GetById = (id, callback) => {
        var query = {"_id": id};
        ${extratfromViewModel}.findOne(query, callback);
    }
   
}

module.exports = {${ViewModel}};
`;
}

const fs = require('fs');
 try 
 {
     const file = fs.writeFileSync(fullpath + "/" + ViewModel + '.js', fileContent);
     console.log(`${ViewModel}.js generated`);
 } catch (error) 
 {
   console.log(error);
}