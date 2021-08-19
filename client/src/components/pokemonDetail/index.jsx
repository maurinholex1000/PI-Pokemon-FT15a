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
        pokemon && pokemon.tipos && <div class= {`${pokemon.tipos[0].name}`+" thumb-container"} >
            <h3>{pokemon.name}</h3>
            <img  src={pokemon.image} alt="" />
            <div >
            <div class="item">    
             <div class="item">
              <h3 >ID:</h3>
              <div >{pokemon.id}</div>
             </div>
            </div>
            <div class="item">
             <div class="item">
              <h3>HP:</h3>
              <div>{pokemon.hp}</div>
             </div> 
             <div class="item">
              <h3>Fuerza:</h3>
              <div>{pokemon.attack}</div>
             </div>
             <div class="item">   
              <h3>Defensa:</h3>
              <div>{pokemon.defense}</div>
             </div>
             <div class="item"> 
              <h3>Velocidad:</h3>
              <div>{pokemon.speed}</div>
             </div>  
            </div>
            <div class="item">
            <div class="item">
              <h3>Altura:</h3>
              <div>{pokemon.height}</div>
             </div>
             <div class="item">    
              <h3>Peso:</h3>
              <div>{pokemon.weight}</div>
             </div> 
              {console.log(pokemon.tipos)}
             <div class="item">
              <h3>Tipos:</h3>
              {   
                  pokemon.tipos.map(tipo => <div> {tipo.name} </div>)
              }
             </div>
            </div>
            </div>
        </div>
        }
    </div>
}