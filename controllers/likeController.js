const Post = require("../models/Post");


// ================= TOGGLE LIKE =================

exports.toggleLike = async (req, res) => {

    try {

        const { postId } = req.body;

        const userId = req.user.id;


        // check if post exists
        const post = await Post.findById(postId);

        if (!post) {

            return res.status(404).json({

                success: false,

                message: "Post not found"
            });
        }


        // check if already liked
        const alreadyLiked = post.likes.includes(userId);


        // unlike
        if (alreadyLiked) {

            await Post.findByIdAndUpdate(

                postId,

                {
                    $pull: {
                        likes: userId
                    }
                }
            );

            return res.status(200).json({

                success: true,

                message: "Post unliked"
            });
        }


        // like
        await Post.findByIdAndUpdate(

            postId,

            {
                $push: {
                    likes: userId
                }
            }
        );


        return res.status(200).json({

            success: true,

            message: "Post liked"
        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: "Like operation failed"
        });
    }
};