const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const applyMiddlewares = (app) => {

    app.use(express.json());

    app.use(cookieParser());

    app.use(cors({

        origin: ["http://localhost:3000"],

        credentials: true
    }));


    app.use(fileUpload({

        useTempFiles: true,

        tempFileDir: "/tmp/"
    }));
}

module.exports = applyMiddlewares;