const axios = require("axios");



exports.chatWithAI = async (req, res) => {

    try {

        const { question } = req.body;


        if (!question) {

            return res.status(400).json({

                success: false,

                message: "Question is required"
            });
        }


        const response = await axios.post(

            `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL}:generateContent?key=${process.env.GEMINI_API_KEY}`,

            {
                contents: [

                    {
                        parts: [

                            {
                                text: `You are an assistant for a blog application. Help users generate blog ideas, summaries, and writing suggestions.\n\nUser Question: ${question}`
                            }
                        ]
                    }
                ]
            },

            {
                headers: {

                    "Content-Type": "application/json"
                }
            }
        );


        const answer =

            response.data?.candidates?.[0]?.content?.parts?.[0]?.text

            || "No response generated";


        return res.status(200).json({

            success: true,

            answer
        });

    }

    catch (error) {

        console.log(error);


        return res.status(500).json({

            success: false,

            message: "AI service failed"
        });
    }
};