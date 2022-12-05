const { Router } = require('express');
// const { route } = require('../app');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const videogames = require('./games');
const genre = require('./genre');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogame',videogames);
router.use('/genre',genre);

module.exports = router;
