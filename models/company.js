const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please provide a name']
    },
    logo:{
        type: String,
        required: [true, 'Please provide a logo']
    },
    summary:{
        type: String,
        required: [true, 'Please provide a summary'],
        maxlength: [400, 'Summary cannot be more than 100 characters']
    },
    advocates:{
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'Advocate',
    }

})

module.exports = mongoose.model('Company', companySchema)