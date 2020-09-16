const express = require('express');
const router = express.Router();
const DefaultController = require("../src/controllers/DefaultController");
module.exports = (function () {
    router.get("/", DefaultController.defaultPage)
        .post("/", (req, res)=>{
        } );

    return router;

 })();
