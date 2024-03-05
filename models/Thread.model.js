const { Schema, model } = require("mongoose");

const threadSchema = new Schema(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
            required: [true, "Title is required"]
        },
        content: {
            type: String,
            required: [true, "Content is required"],
        },
        parentTopic: {
            type: String,
            required: true
        },
        numId: {
            type: Number,
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

const Thread = model("Thread", threadSchema);

module.exports = Thread;
