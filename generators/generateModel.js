const path = require("path");
const fullpath = path.join(__dirname, 'models').replace("generators/models", "src/models");
const argv = require('minimist')(process.argv.slice(2));
console.log(argv);
console.log(fullpath);
const {model} = argv;

if(!model)
{
    console.log("Please use the switch --model to create a model name");
}

const reformatModelname = model.replace("Model", "");
const filecontent = `
const ConnectMongo = require("../../dbSetups/SetupMongo");

const ${reformatModelname}Schema = ConnectMongo.Schema({
    Fullname: String,
    Emailaddress : String,
    Password : String,
}, {collection:"${reformatModelname}", timestamps : true});

const ${reformatModelname} = ConnectMongo.model("${reformatModelname}", ${reformatModelname}Schema);
module.exports = {${reformatModelname}};`

const fs = require('fs');
 try 
 {
     const file = fs.writeFileSync(fullpath + "/" + model + '.js', filecontent);
     console.log(`${model}.js generated`);
 } catch (error) 
 {
   console.log(error);
}
