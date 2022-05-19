var express = require('express');
var router = express.Router();

router.use('/api/auth', require('../controllers/auth.controller'));
router.use('/api/blogs', require('../controllers/blogs.controller'));

module.exports = router;