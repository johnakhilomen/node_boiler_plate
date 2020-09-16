//node ./generators/generateModel.js --model UserModel --l 'f,e,p' --t 's,s,s'


const path = require("path");
const fullpath = path.join(__dirname, 'models').replace("generators/models", "src/models");
const argv = require('minimist')(process.argv.slice(2));
console.log(argv);
//console.log(fullpath);
const labels = { 
    "f" : "Fullname", 
    "e" : "Emailaddress", 
    "u" : "Username", 
    "p" : "Password", 
    "a" : "Address", 
    "ci" : "City", 
    "s" : "State", 
    "co" : "Country", 
    "z" : "Zip",
    "g" : "Geolocation",
    "ac" : "ActivationCode",
    "va" : "VerifiedAccount"
};
const types = {
    "s" : "String", 
    "n" : "Number", 
    "b" : "Boolean", 
    "a" : "[]", 
    "o" : "{}"
};
console.log(labels);
console.log(types);
const {model, l, t} = argv;
const larr = l.split(",");
const tarr = t.split(",");
console.log(l)
console.log("length :"+larr.length)
if(!model)
{
    console.log("Please use the switches --model and --kv to create a model name");
}


const reformatModelname = model.replace("Model", "");
let filecontent = `const ConnectMongo = require("../../dbSetups/SetupMongo");

const ${reformatModelname}Schema = ConnectMongo.Schema({\n`;

larr.forEach((num, index)=>{
    switch(num)
    {
        case "f":
            filecontent += `${labels[`${num}`]}: {
            type : ${types[`${tarr[index]}`]},
            required: "${labels[`${num}`]} is required",
            minlength: 6, 
            maxlength: 100,
            lowercase: true,
            unique: false,
            },\n`;
            break;
        case "e":
            filecontent += `${labels[`${num}`]}: {
            type : ${types[`${tarr[index]}`]},
            required: "${labels[`${num}`]} is required",
            minlength: 6,
            maxlength: 100,
            lowercase: true,
            trim: true,
            unique: true,
            match: ${new RegExp(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/)}
            },\n`;
            break;
        case "p":
            filecontent += `${labels[`${num}`]}: {
            type : ${types[`${tarr[index]}`]},
            required: "${labels[`${num}`]} is required",
            minlength: 6,
            maxlength: 100,
            },\n`;
            break;
        case "ci" || "co" || "s":
            filecontent += `${labels[`${num}`]}: {
            type : ${types[`${tarr[index]}`]},
            required: "${labels[`${num}`]} is required",
            maxlength: 30,
            },\n`;
            break;
        case "z" : 
        filecontent += `${labels[`${num}`]}: {
            type : ${types[`${tarr[index]}`]},
            required: "${labels[`${num}`]} is required",
            match: ${new RegExp(/^(\d{5})?$/)}
            },\n`;
            break;      
        default:
            filecontent += `${labels[`${num}`]}: {
            type : ${types[`${tarr[index]}`]},
            required: "${labels[`${num}`]} is required",
            },\n`;
            break;
            
    }
    
});
    
filecontent+=`}, {collection:"${reformatModelname.toLowerCase()}", timestamps : true});

const ${reformatModelname} = ConnectMongo.model("${reformatModelname}", ${reformatModelname}Schema);
module.exports = {${reformatModelname}};`;

const fs = require('fs');
 try 
 {
     const file = fs.writeFileSync(fullpath + "/" + model + '.js', filecontent);
     console.log(`${model}.js generated`);
 } catch (error) 
 {
   console.log(error);
}
