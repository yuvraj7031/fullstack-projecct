const express = require("express");
require("dotenv").config();

const dns = require("dns");

// config imports
const connectDB = require("./config/database");
const connectCloudinary = require("./config/cloudinary");
const applyMiddlewares = require("./config/middleware");

// route imports
const authRoutes = require("./routes/authRoutes");
const postRoutes = require("./routes/postRoutes");
const commentRoutes = require("./routes/commentRoutes");
const aiRoutes = require("./routes/aiRoutes");


const app = express();


// qsrv issue fixing 
dns.setServers(["1.1.1.1", "8.8.8.8"]);


// apply middleware
applyMiddlewares(app);


// connect services
connectDB();
connectCloudinary();


// ROUTES


// auth routes

app.use("/api/v1/auth", authRoutes);


// blog post routes

app.use("/api/v1/posts", postRoutes);


// comment routes

app.use("/api/v1/comments", commentRoutes);


// ai assistant routes

app.use("/api/v1/ai", aiRoutes);



//  DEFAULT ROUTES 


// root route

app.get("/", (req, res) => {

    res.send("Blog Backend Running");
});


// health check

app.get("/health", (req, res) => {

    res.status(200).json({

        success: true,

        uptime: process.uptime(),

        message: "Server healthy"
    });
});



// ERROR HANDLER 


// invalid route

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route not found"
    });
});



// SERVER


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(`Server started on port ${PORT}`);
});