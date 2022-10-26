const mongoose = require('mongoose');

const advocateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    profile_pic:{
        type: String,
        required: [true, 'Please provide a profile picture']
    },
    bio:{
        type: String,
        required: [true, 'Please provide a long bio'],
        maxlength: [500, 'Long bio cannot be more than 500 characters']
    },
    twitter:{
        type: String,
        required: [true, 'Please provide a twitter link']
    },
    username:{
        type: String,
        required: [true, 'Please provide a username']
    },
    follower_count:{
        type: Number,
        required: [true, 'Please provide a number of followers']
    }

})

module.exports = mongoose.model('Advocate', advocateSchema)