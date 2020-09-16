const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cors = require("cors");
const UserRouter = require("../routers/UserRouter");

const {DbParameters} = require("../configuration/ConfigParameters");
const Config = require("../configuration/Config");
const defaultConfig = new Config(DbParameters.TYPE)

class Server extends express{
    constructor()
    {
        super();
        // view engine setup
        this.set('views', path.join(__dirname, 'views'));
        this.engine('html', require('ejs').renderFile);
        this.set('view engine', 'html');

        this.use(bodyparser.urlencoded({ extended: false }));
        this.use(bodyparser.json());
        this.use(cors());
        defaultConfig.SetupDB();
        //Routes
        this.use('/user', require( '../routers/UserRouter' ) );

    }

}

module.exports = new Server();