//node ./generators/generateModel.js --model UserModel --labels '{"Fullname":"String", "Emailaddress" : "String", "Password" : "String"}'
//node ./generators/generateModel.js --model UserModel --labels '{"Fullname":"String", "Geolocation": "Object", "SomeArray" : "[]" }'

let displayInfo = () => {
    console.log(`Examples of labels to pass as argument: ${["Fullname", "Emailaddress", "Username", "Password",
    "Address", "City", "State", "Country", "Zip", "Geolocation", "ActivationCode"
    ]}`);
    
    console.log(`Examples of types: ${["String", "Number", "Boolean", "Array", "Object"] }`);
        
}

(function () {

displayInfo();
   
const path = require("path");
const fullpath = path.join(__dirname, 'models').replace("generators/models", "src/models");
const argv = require('minimist')(process.argv.slice(2));
//console.log(argv);

const {model, labels} = argv;

if(!model)
{
    console.log("The switch --model is missing");
    process.exit(0); 
}

if(!labels)
{
    console.log("The switch --labels is missing");
    process.exit(0);
}

const reformatModelname = model.replace("Model", "");
let filecontent = `const ConnectMongo = require("../../dbSetups/SetupMongo");

const ${reformatModelname}Schema = ConnectMongo.Schema({\n`;

const labelsParsed = JSON.parse(labels);
console.log(labelsParsed["Fullname"]);
Object.entries(labelsParsed).forEach(([key, value])=>{
    if(value == "Array")
    {
        value = "[]";    
    }
    else if (value == "Object")
    {
        value = "{}";
    }
    switch(key)
    {
        case "Fullname" || "Firstname" || "Lastname":
            filecontent += `${key} : {
            type : ${value},
            required: "${key} is required",
            minlength: 6, 
            maxlength: 100,
            unique: false,
            },\n`;
            break;
        case "Emailaddress":
            filecontent += `${key}: {
            type : ${value},
            required: "${key} is required",
            minlength: 6,
            maxlength: 100,
            lowercase: true,
            trim: true,
            unique: true,
            match: ${new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)}
            },\n`;
            break;
        case "Password":
            filecontent += `${key} : {
            type : ${value},
            required: "${key} is required",
            minlength: 6,
            maxlength: 100,
            },\n`;
            break;
        case "City" || "Country" || "State":
            filecontent += `${key} : {
            type : ${value},
            required: "${key} is required",
            maxlength: 30,
            },\n`;
            break;
        case "z" : 
        filecontent += `${key} : {
            type : ${value},
            required: "${key} is required",
            match: ${new RegExp(/^(\d{5})?$/)}
            },\n`;
            break;      
        default:
            filecontent += `${key} : {
            type : ${value},
            required: "${key} is required",
            },\n`;
            break;
            
    }
    
});
    
filecontent+=`}, {collection:"${reformatModelname.toLowerCase()}", timestamps : true});

const ${reformatModelname} = ConnectMongo.model("${reformatModelname}", ${reformatModelname}Schema);
module.exports = {${reformatModelname}};`;

const fs = require('fs');
const { exit } = require("process");
 try 
 {
     const file = fs.writeFileSync(fullpath + "/" + model + '.js', filecontent);
     console.log(`${model}.js generated`);
 } catch (error) 
 {
   console.log(error);
}


})()
