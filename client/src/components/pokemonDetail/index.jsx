import { useState, useEffect } from "react"
import axios from 'axios'
import {useParams } from 'react-router-dom'

export default function PokemonDetail() {
    const [pokemon, setPokemon] = useState({})
    const {id} = useParams()

    function getPokemonById(id) {
        axios.get('http://localhost:3001/pokemons/' + id)
        .then((pokemon) => {
            setPokemon(pokemon.data)
        })
    }
    console.log(pokemon)
    useEffect( () => {
        getPokemonById(id)
    }, [])

    return <div>
        {   
        pokemon && pokemon.tipos && <div>
            <div>{pokemon.name}</div>
            <img src={pokemon.image} alt="" />
            <div>{pokemon.id}</div>
            <div>{pokemon.hp}</div>
            <div>{pokemon.attack}</div>
            <div>{pokemon.defense}</div>
            <div>{pokemon.speed}</div>
            <div>{pokemon.height}</div>
            <div>{pokemon.weight}</div>
            {console.log(pokemon.tipos)}
            {   
                pokemon.tipos.map(tipo => <div> {tipo.name} </div>)
            }
        </div>
        }
    </div>
}