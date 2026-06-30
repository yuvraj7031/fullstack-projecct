const Comment = require("../models/Comment");
const Post = require("../models/Post");


// ================= CREATE COMMENT =================

exports.createComment = async (req, res) => {

    try {

        const { postId, text } = req.body;

        // user comes from auth middleware after JWT verification
        const userId = req.user.id;


        // validation
        if (!postId || !text) {

            return res.status(400).json({
                success: false,
                message: "Post ID and comment text are required"
            });
        }


        // create comment
        const comment = await Comment.create({

            post: postId,

            user: userId,

            text: text
        });


        // push comment id inside post
        await Post.findByIdAndUpdate(

            postId,

            {
                $push: {
                    comments: comment._id
                }
            }

        );


        return res.status(201).json({

            success: true,

            message: "Comment added successfully"
        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Failed to create comment"
        });
    }
};




// ================= GET ALL COMMENTS =================

exports.getAllComments = async (req, res) => {

    try {

        const comments = await Comment.find()

            .populate("user", "name email")

            .populate("post", "title");


        return res.status(200).json({

            success: true,

            comments: comments
        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Failed to fetch comments"
        });
    }
};