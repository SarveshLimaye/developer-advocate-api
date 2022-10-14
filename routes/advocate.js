const express = require('express');
const router = express.Router();

const { getAllAdvocates, getAdvocateById ,addAdvocate} = require('../controllers/advocate');

router.route('/').get(getAllAdvocates);
router.route('/:id').get(getAdvocateById);
router.route('/').post(addAdvocate);

module.exports = router;