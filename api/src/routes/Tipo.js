const { Router } = require('express');
const {Tipo} = require('../db')
const router = Router();
const axios = require('axios')



router.get('/', async (req, res) => {
    //if tengo query param, hago una cosa, sino busco todos. PISTA: req.query
    try {
        const apiTipos = await Tipo.findAll()
        res.send(apiTipos)
    } catch (error) {
        console.log(error)
    }
    
    
    
})

module.exports = router;