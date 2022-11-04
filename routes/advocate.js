const express = require('express');
const router = express.Router();

const { getAllAdvocates, getAdvocateById ,addAdvocate , deleteAdvocate,getAdvocateByUsername} = require('../controllers/advocate');

router.route('/').get(getAllAdvocates);
router.route('/').post(addAdvocate);
router.route('/:username').get(getAdvocateByUsername);
router.route('/:id').delete(deleteAdvocate);

module.exports = router;