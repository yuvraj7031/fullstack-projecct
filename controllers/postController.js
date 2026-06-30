const Post = require("../models/Post");
const cloudinary = require("cloudinary").v2;



// helper function

const uploadToCloudinary = async (file) => {

    const response = await cloudinary.uploader.upload(

        file.tempFilePath,

        {
            folder: "BlogApp"
        }
    );

    return response;
};




// ================= CREATE POST =================

exports.createPost = async (req, res) => {

    try {

        const { title, content, summary } = req.body;

        const userId = req.user.id;


        if (!req.files || !req.files.image) {

            return res.status(400).json({

                success: false,

                message: "Image required"
            });
        }


        const file = req.files.image;


        const cloudinaryResponse = await uploadToCloudinary(file);


        const post = await Post.create({

            title,

            content,

            summary,

            imageUrl: cloudinaryResponse.secure_url,

            author: userId
        });


        return res.status(201).json({

            success: true,

            message: "Post created successfully",

            post
        });
    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Post creation failed"
        });
    }
};




// ================= GET ALL POSTS =================

exports.getAllPosts = async (req, res) => {

    try {

        const posts = await Post.find()

            .populate("author", "name");


        return res.status(200).json({

            success: true,

            posts
        });
    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: "Failed to fetch posts"
        });
    }
};




// ================= GET SINGLE POST =================

exports.getPostById = async (req, res) => {

    try {

        const { id } = req.params;


        const post = await Post.findById(id)

            .populate("author", "name")

            .populate({

                path: "comments",

                populate: {

                    path: "user",

                    select: "name"
                }
            });


        if (!post) {

            return res.status(404).json({

                success: false,

                message: "Post not found"
            });
        }


        return res.status(200).json({

            success: true,

            post
        });
    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: "Failed to fetch post"
        });
    }
};




// ================= DELETE POST =================

exports.deletePost = async (req, res) => {

    try {

        const { id } = req.params;

        const userId = req.user.id;


        const post = await Post.findById(id);


        if (!post) {

            return res.status(404).json({

                success: false,

                message: "Post not found"
            });
        }


        if (post.author.toString() !== userId.toString()) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized"
            });
        }


        await Post.findByIdAndDelete(id);


        return res.status(200).json({

            success: true,

            message: "Post deleted successfully"
        });
    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: "Delete failed"
        });
    }
};




// ================= EDIT POST =================

exports.editPost = async (req, res) => {

    try {

        const { id } = req.params;

        const { title, content, summary } = req.body;

        const userId = req.user.id;


        const post = await Post.findById(id);


        if (!post) {

            return res.status(404).json({

                success: false,

                message: "Post not found"
            });
        }


        if (post.author.toString() !== userId.toString()) {

            return res.status(403).json({

                success: false,

                message: "Unauthorized"
            });
        }


        const updatedPost = await Post.findByIdAndUpdate(

            id,

            {
                title,
                content,
                summary
            },

            {
                new: true
            }
        );


        return res.status(200).json({

            success: true,

            post: updatedPost
        });

    }

    catch (error) {

        return res.status(500).json({

            success: false,

            message: "Update failed"
        });
    }
};