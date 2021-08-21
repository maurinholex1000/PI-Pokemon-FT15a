import axios from 'axios'
import {POKEMON_URL} from '../constantes'
import { GET_POKEMONS,GET_POKEMON,GET_POKEMON_FILTER,GET_POKEMON_API } from './constantes'

export function getPokemons() {
    return function(dispatch) {
        return axios.get(POKEMON_URL)
        .then((pokemons) => {
            dispatch({
                type: GET_POKEMONS,
                payload: pokemons.data
            })
        })
    }
}

export function getPokemon(name) {
    console.log(name)
    return function(dispatch) {
        return axios.get(POKEMON_URL+name)
        .then((pokemon) => {
            dispatch({
                type: GET_POKEMON,
                payload: pokemon.data
            })
        })
    }
}

export const getPokemonFilter = (types, array) => (dispatch) =>{
    console.log(types);
    console.log(array)
    const type1 = new RegExp(types);
    const res = array.filter(c => c.tipos[0].name.match(type1));
    // const res = array.filter(c => c.tipos(d =>d.name.match(type1)));
    dispatch({type: GET_POKEMON_FILTER, payload: [...res]})
  
  };

  export const filterApi = (creator, array) => (dispatch) => {
    console.log(creator);
    if(creator === 'api') {
     const res = array.filter(c  =>typeof c.id === 'number')
     dispatch({type: GET_POKEMON_API, payload: [...res]})
    }
    if(creator === 'db') {
     const res = array.filter(c  =>typeof c.id === 'string')
     dispatch({type: GET_POKEMON_API, payload: [...res]})
    } 
    if(creator === 'all') {
      dispatch({type: GET_POKEMON_API, payload: [...array]})
    }
   
    if(creator === 'null') {
      dispatch({type: GET_POKEMON_API, payload: []})
    }
   
  }