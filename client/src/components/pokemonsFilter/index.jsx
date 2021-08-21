import axios from "axios"
import { Link } from "react-router-dom"
import { useEffect,useState } from "react"
import { getPokemonFilter,filterApi } from "../../actions"
import { useDispatch,useSelector } from "react-redux"
import Pokemon from "../pokemon"

   
export default function PokemonsFilter() {
    var pokemons = useSelector(state => state.pokemons)
    var pokemonsfilter = useSelector(state => state.pokemonsfilter)
    const dispatch = useDispatch()
    const [tipos, setTipos] = useState([])


    function getTipos() {
        axios.get('http://localhost:3001/types/')
        .then(response => {
            setTipos(response.data)
        })
    }

    useEffect(() => {
        getTipos()
    }, [])

   
    function filter(e){
        dispatch(getPokemonFilter(e.target.value,pokemons))
    }

    function filtApi(e) {
        dispatch(filterApi(e.target.value, pokemons))
      }









return <div>
<span > By Type:</span>
<select className="type" name="type"  onChange={filter}>
    <option value='null'>null</option>
    {tipos && tipos.map((c, index) => (
    <option value={c.name} key={index} name="c.name">{c.name}</option>
    ))}
</select>
<span> By Creator:</span> 
<select className="type" name="type" onChange={filtApi}>
    <option value="null">null</option>
    <option value="all">All</option>
    <option value="api">Api Poke</option>
    <option value="db">Created Poke</option>
</select> 

<div className="pokemon-container">
               <div className="all-container">  
        {
            // filteredPokemons.map((pokemon) => {
              
                pokemonsfilter && pokemonsfilter.map((pokemon) => {
                console.log(pokemonsfilter)
                return <Link to={`/pokemon/${pokemon?.id}`} style={{textDecoration:'none'}}>
                          <Pokemon key={pokemon?.id} name={pokemon?.name} image={pokemon?.image} attack={pokemon?.attack} tipos={pokemon?.tipos} />
                       </Link>

            })
               
        }
              </div>
         </div>
</div>



}