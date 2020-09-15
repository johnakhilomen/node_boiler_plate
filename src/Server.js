const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");

const {DbParameters} = require("../configuration/ConfigParameters");
const Config = require("../configuration/Config");
const defaultConfig = new Config(DbParameters.TYPE)

class Server extends express{
    constructor()
    {
        super();
        this.use(bodyparser.urlencoded({ extended: false }));
        this.use(bodyparser.json());
        this.use(cors());
        defaultConfig.SetupDB();
    }

}

module.exports = new Server();