const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true,
    },
    img:{
        type: String,
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    date:{
        type: Date,
        default: Date.now
    },
},{timestamps: true});

const Blog = mongoose.model("Blog",blogSchema);

module.exports = Blog;