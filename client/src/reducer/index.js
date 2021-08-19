import {GET_POKEMONS,GET_POKEMON, GET_POKEMON_FILTER,GET_POKEMON_API} from '../actions/constantes'
//antes de hacer el reducer, crea tus constantes
//en otro archivo(opcional)

//primero, seteamos nuestro estado inicial
var initialState = {
    pokemons: [],
    pokemon: []
}
//Esta funcion reducer va a llamarse con el initialState
//como valor predeterminado, y segundo parametro
//las acciones
//cuando despachemos una accion, se va a ejecutar nuevamente
//con el estado de ese momento, mas la accion
function reducer(state = initialState, action) {
    //un switch con nuestras acciones posibles
    switch(action.type) {
        case GET_POKEMONS:
            //aca ejecutamos la logica
            return {
            ...state,
            pokemons: action.payload
        }
        case GET_POKEMON:
            //aca ejecutamos la logica
            return {
            ...state,
            pokemon: action.payload
        }

        case GET_POKEMON_FILTER:
            //aca ejecutamos la logica
            return {
            ...state,
            pokemons: action.payload
        }
         
        case GET_POKEMON_API:
            //aca ejecutamos la logica
            return {
            ...state,
            pokemons: action.payload
        }
        
        default: return state
    }

}
//y exportamos nuestro reducer
//una vez hecho esto, lo llamomos en store!
export default reducer;