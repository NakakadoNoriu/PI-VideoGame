const express = require('express');
const router = express();

const {getVideoGames,getGameId,postGame} = require('../controllers/index');

router.get('/',getVideoGames);
router.get('/:id',getGameId);
router.post('/',postGame);

module.exports = router