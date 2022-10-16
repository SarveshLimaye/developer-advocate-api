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



const addAdvocate = asyncHandler(async (req, res) => {
 
 const { name, profile_pic, short_bio, long_bio, advocate_year_experience, companyName, links } = req.body;
 let idComp
 let href
 let logo
 const fetchCompany = await Company.find({name : companyName });
fetchCompany.map(company =>{
     idComp = String(company._id)
     href = `http://localhost:5000/companies/${idComp}`
     logo = company.logo
 });

 const company = {
        id: idComp,
        name: companyName,
        logo: logo,
        href: href
 }
 
 
 const advocate = await Advocate.create({
        name,
        profile_pic,
        short_bio,
        long_bio,
        advocate_year_experience,
        company,
        links
    });
    if (advocate) {
        const updateCompany = await Company.findByIdAndUpdate(idComp, { $push: { advocates: advocate._id } }, { new: true });
       res.status(200).json({
            _id: advocate._id,
            name: advocate.name,
            profile_pic: advocate.profile_pic,
            short_bio: advocate.short_bio,
            long_bio: advocate.long_bio,
            advocate_year_experience: advocate.advocate_year_experience,
            company: advocate.company,
            links: advocate.links
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
    searchAdvocates
}