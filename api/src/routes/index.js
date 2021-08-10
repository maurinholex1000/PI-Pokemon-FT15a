const { Router } = require('express');

// es equivalente a

// const temp = require('express');
// const Router = temp.Router;


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const pokemonRoutes = require('./Pokemon')
const typeRoutes = require('./Tipo')
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemonRoutes)
router.use('/types', typeRoutes)
module.exports = router;
