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
    short_bio:{
        type: String,
        required: [true, 'Please provide a short bio'],
        maxlength: [100, 'Short bio cannot be more than 100 characters']
    },
    long_bio:{
        type: String,
        required: [true, 'Please provide a long bio'],
        maxlength: [500, 'Long bio cannot be more than 500 characters']
    },
    advocate_year_experience:{
        type: Number,
        required: [true, 'Please provide a year of experience']
    },
    company:{
        id:{
            type:String,
            required: [true, 'Please provide a company id']

        },
        name:{
            type:String,
            required: [true, 'Please provide a company name']
        },
        logo:{
            type:String,
            required: [true, 'Please provide a company logo']
        },
        href:{
            type:String,
            required: [true, 'Please provide a company href']
        }
    },
    links:{
        youtube:{
            type: String,
        },
        twitter:{
            type: String,
        },
        github:{
            type: String,
        },

    }


})

module.exports = mongoose.model('Advocate', advocateSchema)