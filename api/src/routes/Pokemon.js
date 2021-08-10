const { Router } = require('express');
const { Pokemon,Tipo} = require('../db')
const { v4: uuidv4 } = require('uuid');
const router = Router();
const axios = require('axios')


router.get('/', async (req, res, next) => {
    //if tengo query param, hago una cosa, sino busco todos. PISTA: req.query
    
    
     
     
    var apiPokemonsPromise = axios.get('https://pokeapi.co/api/v2/pokemon')
    var dbPokemonsPromise =  Pokemon.findAll()
    return Promise.all([
        apiPokemonsPromise,
        dbPokemonsPromise
    ]).then(async (resultados) => {
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
        if (req.query.hasOwnProperty('name')) {
            const name=req.query.name
            if(apiPokemons.some((e)=>e.name===name)){
                var pokemon = await axios.get('https://pokeapi.co/api/v2/pokemon/'+name)
                pokemon=pokemon.data
                
                return res.send({
                    id:pokemon.id,
                    name:pokemon.name,
                    image: pokemon.sprites.other.dream_world.front_default,
                    hp: pokemon.stats[0].base_stat,
                    attack: pokemon.stats[1].base_stat,
                    defense: pokemon.stats[2].base_stat,
                    speed: pokemon.stats[5].base_stat,
                    height:pokemon.height,
                    weight:pokemon.weight
                })
            }

            if(dbPokemons.some((e)=>e.name===name)){
                var pokemon = await Pokemon.findAll({
                    where:{name},
                    include:Tipo
                }) 

                pokemon=pokemon[0]
                pokemon2 = {
                    id: pokemon.id,
                    name: pokemon.name,
                    hp: pokemon.hp,
                    attack: pokemon.attack,
                    defense: pokemon.defense,
                    speed: pokemon.speed,
                    height: pokemon.height,
                    weight: pokemon.weight,
                    tipos: pokemon.tipos.map((tipo) => {
                        return {
                            id: tipo.id,
                            name: tipo.name
                        }
                    })
                }

               res.send(pokemon2)
            }
            return res.status(404).json({error:'el pokemon no existe'})
            
        }
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
            //console.log(pokemon)
            pokemon = {
                id: pokemon.id,
                name: pokemon.name,
                hp: pokemon.hp,
                attack: pokemon.attack,
                defense: pokemon.defense,
                speed: pokemon.speed,
                height: pokemon.height,
                weight: pokemon.weight,
                tipos: pokemon.tipos.map((tipo) => {
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






router.post('/', (req, res,next) => {
    const {name, hp, attack, defense, speed, height, weight, tipos} = req.body

    Pokemon.create({
        id: uuidv4(),
        name,
        hp, 
        attack, 
        defense, 
        speed, 
        height, 
        weight
    })
    .then(createdPokemon => {
        return createdPokemon.setTipos(tipos)
    })
    .then((pokemonWithTipos) => {
        res.json(pokemonWithTipos)
    })
    .catch(error => next(error))
})






module.exports = router;