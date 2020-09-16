var express = require('express');
var router = express.Router();
module.exports = (function () {
    router.get("/", (req, res)=>{
            res.send("Hey there");
        })
        .post("/", (req, res)=>{
        } );

    return router;

 })();
