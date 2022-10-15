const express = require('express');
const router = express.Router();

const { getAllCompanies, getCompanyById ,addCompany} = require('../controllers/company');

router.route('/').get(getAllCompanies);
router.route('/:id').get(getCompanyById);
router.route('/').post(addCompany);

module.exports = router;