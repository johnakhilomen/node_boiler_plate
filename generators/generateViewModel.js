//node ./generators/generateViewModel.js --ViewModel SomeViewModel

const path = require("path");
const fullpath = path.join(__dirname, 'models').replace("generators/models", "src/viewModels");
const argv = require('minimist')(process.argv.slice(2));
console.log(argv);
const {ViewModel} = argv;
const extratfromViewModel = ViewModel.replace("ViewModel", "");
const extratfromViewModelInLowerCase = ViewModel.replace("ViewModel", "").toLowerCase();
let fileContent = 
`const {${extratfromViewModel}} = require("../models/${extratfromViewModel}Model");

class ${ViewModel} {
    _${extratfromViewModelInLowerCase}Model;
    constructor(${extratfromViewModelInLowerCase})
    {
        this._${extratfromViewModelInLowerCase} = ${extratfromViewModelInLowerCase};
    }
    Create = (callback) => {
        const modelLocal = this._${extratfromViewModelInLowerCase};
        const model = new ${extratfromViewModel}(modelLocal);
        model.save(callback);
    }
     
    GetById = (id, callback) => {
        var query = {"_id": id};
        ${extratfromViewModel}.findOne(query, callback);
    }
   
}

module.exports = {${ViewModel}};
`

const fs = require('fs');
 try 
 {
     const file = fs.writeFileSync(fullpath + "/" + ViewModel + '.js', fileContent);
     console.log(`${ViewModel}.js generated`);
 } catch (error) 
 {
   console.log(error);
}