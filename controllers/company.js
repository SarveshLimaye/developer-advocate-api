const Company = require('../models/company');
const asyncHandler = require('express-async-handler');

const getAllCompanies = asyncHandler(async (req, res) => {
    const pageOptions = {
        page: parseInt(req.query.page), 
        limit: parseInt(req.query.limit)
    }
    const companies = await Company.find().populate('advocates').skip((pageOptions.page - 1) * pageOptions.limit).limit(pageOptions.limit).exec(function (err, doc) {
        if(err) { res.status(500).json(err); return; };
        res.status(200).json(doc);
    });
});

const getCompanyById = asyncHandler(async (req, res) => {
    const company = await Company.findById(req.params.id).populate('advocates');
    if (company) {
        res.status(200).json({ company });
    } else {
        res.status(404);
        throw new Error('Company not found');
    }
});

const addCompany = asyncHandler(async (req, res) => {
    const { name, logo, summary, advocates, links } = req.body;
    const company = await Company.create({
        name,
        logo,
        summary,
        advocates,
        links
    });
    if (company) {
        res.status(200).json({
            _id: company._id,
            name: company.name,
            logo: company.logo,
            summary: company.summary,
            advocates: company.advocates,
            links: company.links
        });
    } else {
        res.status(400);
        throw new Error('Invalid company data');
    }
})

module.exports = {
    getAllCompanies,
    getCompanyById,
    addCompany
}