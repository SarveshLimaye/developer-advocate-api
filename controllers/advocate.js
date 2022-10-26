const Advocate = require('../models/advocate');
const Company = require('../models/company');
const asyncHandler = require('express-async-handler');

const getAllAdvocates = asyncHandler(async (req, res) => {
    const pageOptions = {
        page: parseInt(req.query.page), 
        limit: parseInt(req.query.limit)
    }
    
    if(req.query.query){
       await Advocate.find({name:{"$regex":`${req.query.query}`,"$options":"i" }})
        .skip((pageOptions.page - 1) * pageOptions.limit).limit(pageOptions.limit).exec(function (err, doc) {
            if(err) { res.status(500).json(err); return; };
            res.status(200).json(doc);
        });
        
    } else {
        const advocates = await Advocate.find({}) .skip((pageOptions.page - 1) * pageOptions.limit).limit(pageOptions.limit).exec(function (err, doc) {
            if(err) { res.status(500).json(err); return; };
            res.status(200).json(doc);
        });
        
    }
});

const getAdvocateById = asyncHandler(async (req, res) => {
    const advocate = await Advocate.findById(req.params.id);
    if (advocate) {
        return res.status(200).json({ advocate });
    } else {
       return res.status(404);
    }
});

const searchAdvocates = async (req, res) => {
    const advocates = await Advocate.find({name:{"$regex":`${req.query.name}`,"$options":"i" }});
    console.log(advocates);
    if (advocates) {
        res.status(200).json({ advocates });
    } else {
        res.status(404);
        throw new Error('Advocate not found');
    }
};

const deleteAdvocate = asyncHandler(async (req, res) => {
    const advocate = await Advocate.findById(req.params.id);
    if (advocate) {
        await advocate.remove();
        res.status(200).json({ message: 'Advocate removed' });
    } else {
        res.status(404);
        throw new Error('Advocate not found');
    }
});



const addAdvocate = asyncHandler(async (req, res) => {
 
    const { name, profile_pic, bio, twitter, username , follower_count } = req.body;
    const advocate =  await Advocate.create({
        name,
        profile_pic,
        bio,
        twitter,
        username,
        follower_count
    });
    if(advocate){
        res.status(200).json({
            _id: advocate._id,
            name: advocate.name,
            profile_pic: advocate.profile_pic,
            bio: advocate.bio,
            twitter: advocate.twitter,
            username: advocate.username,
            follower_count: advocate.follower_count
        });
    }else{
        res.status(400);
        throw new Error('Invalid advocate data');
    }
})


module.exports = {
    getAllAdvocates,
    getAdvocateById,
    addAdvocate,
    searchAdvocates,
    deleteAdvocate
}