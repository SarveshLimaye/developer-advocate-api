const express = require('express');
const router = express.Router();

const { getAllAdvocates, getAdvocateById ,addAdvocate , deleteAdvocate} = require('../controllers/advocate');

router.route('/').get(getAllAdvocates);
router.route('/:id').get(getAdvocateById);
router.route('/').post(addAdvocate);
router.route('/:id').delete(deleteAdvocate);

module.exports = router;