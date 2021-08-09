const { Router } = require('express');
const { Pokemon,Tipo} = require('../db')
const { v4: uuidv4 } = require('uuid');
const router = Router();
const axios = require('axios')


router.get('/', (req, res, next) => {
    //if tengo query param, hago una cosa, sino busco todos. PISTA: req.query
    
    var apiPokemonsPromise = axios.get('https://pokeapi.co/api/v2/pokemon')
    var dbPokemonsPromise =  Pokemon.findAll()

    return Promise.all([
        apiPokemonsPromise,
        dbPokemonsPromise
    ]).then(resultados => {
        var apiPokemons = resultados[0].data.results
        var dbPokemons = resultados[1]

        //aca los normalizo
        apiPokemons = apiPokemons.map((pokemon) => {
            return {
                //id: character.id,
                name: pokemon.name,
                //image: character.image
            }
        })
        dbPokemons = dbPokemons.map((pokemon) => {
            return {
                //id: character.id,
                name: pokemon.name,
                //image: character.image
            }
        })
        //aca los uno
        var allPokemons = apiPokemons.concat(dbPokemons)
        res.send(allPokemons)
    })
    .catch(error => next(error))
})


router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    if(!id) {
        return next({msg: 'No me mandaste el id', status: 500})
    } //esta roto
    var pokemon
    try {
        if(typeof id === 'string' && id.length > 10) {
            pokemon = await Pokemon.findByPk(id, {
                include: Tipo
            })
            pokemon = {
                id: pokemon.id,
                name: pokemon.name,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                height: pokemon.height,
                weight: pokemon.weight,
                tipos: pokemon.Tipos.map((tipo) => {
                    return {
                        id: tipo.id,
                        name: tipo.name
                    }
                })
            }
        } else {
            var pokemonResponse = await axios.get('https://pokeapi.co/api/v2/pokemon/' + id)
            pokemonResponse = pokemonResponse.data
            tiposList = pokemonResponse.types.map((tipo) => {
                const array=tipo.type.url.split('/')
                array.pop()
                return array.pop()
            })
            
            const array2=[]
            for (const tipo of tiposList) {
             const listat = await axios.get('https://pokeapi.co/api/v2/type/' + tipo)
             array2.push(listat.data) 
            }
            

            const tipos = array2.map((tipo) => {
                return {
                    id: tipo.id,
                    name: tipo.name
                }
            })
            pokemon = {
                id: pokemonResponse.id,
                name: pokemonResponse.name,
                image: pokemonResponse.sprites.other.dream_world.front_default,
                hp: pokemonResponse.stats[0].base_stat,
                attack: pokemonResponse.stats[1].base_stat,
                defense: pokemonResponse.stats[2].base_stat,
                speed: pokemonResponse.stats[5].base_stat,
                height: pokemonResponse.height,
                weight: pokemonResponse.weight,
                tipos: tipos

            }
        }
        return res.json(pokemon)
    } catch(error) {
        next(error)
    }

})

module.exports = router;