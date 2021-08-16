import axios from 'axios'
import {POKEMON_URL} from '../constantes'
import { GET_POKEMONS } from './constantes'

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