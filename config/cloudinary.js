const cloudinary = require("cloudinary").v2;

const connectCloudinary = () => {

    try {

        cloudinary.config({

            cloud_name: process.env.CLOUD_NAME,

            api_key: process.env.CLOUD_API_KEY,

            api_secret: process.env.CLOUD_API_SECRET
        });

        console.log("Cloudinary connected");

    } 
    catch (error) {

        console.log("Cloudinary connection failed");

        console.log(error.message);
    }
}

module.exports = connectCloudinary;