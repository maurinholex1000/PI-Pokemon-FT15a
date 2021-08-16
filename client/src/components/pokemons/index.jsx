import { useSelector } from "react-redux"
import {useState, useEffect} from 'react'
import Pokemon from '../pokemon'
import {Link} from 'react-router-dom'

export default function Pokemons() {
    var pokemons = useSelector(state => state.pokemons)
    const [filteredPokemons, setFilteredPokemons] = useState([])

    useEffect(() => {
        setFilteredPokemons(pokemons)
    }, [pokemons])

    function change() {
        var aux = [...pokemons]
        aux.sort((a, b) => {
            if(a.name > b.name) {
                return 1
            } else {
                return - 1
            }
        })
        setFilteredPokemons([...aux])
    }
    return <div>
        <button onClick={change}>filtrar</button>
        {
            filteredPokemons.map((pokemon) => {
                console.log(pokemon)
                return <Link to={`/pokemon/${pokemon?.name}`} style={{textDecoration:'none'}}>
                          <Pokemon name={pokemon?.name} image={pokemon?.image} tipos={pokemon?.tipos} />
                       </Link>
            })
        }
    </div>
}