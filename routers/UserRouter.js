const express = require('express');
const router = express.Router();
const UserController = require("../src/controllers/UserController");

module.exports = (function () {
    router.get("/", UserController.default)
        .post("/add", UserController.addUser);

    return router;

 })();
