const express = require('express');
const { createGroups, getgroup ,getgroupdata } = require('../controllers/userGroup'); // Adjust the path if necessary
const router = express.Router();

router.post('/create-group', createGroups);
router.get('/get-group',getgroup);
router.post('/get-groupdata',getgroupdata)
module.exports = router;

// cheen lunga tujhe saari dunia se hi and he