const express = require('express');

const router = express();

const {getGenreAll} = require('../controllers/index');

router.get('/',getGenreAll)

module.exports = router;