const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        content: {
            type: String,
            required: true
        },
        parentThread: {
            type: Schema.Types.ObjectId,
            ref: "Thread",
            required: true
        },

        createdAt: {
            type: String,
            default: () => {
                const now = new Date();
                const options = { year: 'numeric', month: 'long', day: '2-digit' };
                return now.toLocaleDateString(undefined, options);
            },
        },
    },
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
