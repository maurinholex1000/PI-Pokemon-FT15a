import { useSelector,useDispatch } from "react-redux"
import {useState, useEffect} from 'react'
import Pokemon from '../pokemon'
import {Link} from 'react-router-dom'
import Pagination from "../../Pagination"
import { getPokemonFilter,filterApi } from "../../actions"
import axios from "axios"
import PokemonsFilter from "../pokemonsFilter"

export default function Pokemons() {
    var pokemons = useSelector(state => state.pokemons)
    const dispatch = useDispatch()
    const [filteredPokemons, setFilteredPokemons] = useState([])
    ////////////////////////////////
    const [currentPokemon, setCurrentPokemon] = useState(1);
    const [pokemonsPerPage] = useState(9);
    ////////////////////////////////
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
    


    useEffect(() => {
        setFilteredPokemons(pokemons)
    }, [pokemons])

    function AscporNombre() {
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

    function DescporNombre() {
        var aux = [...pokemons]
        aux.sort((a, b) => {
            if(a.name < b.name) {
                return 1
            } else {
                return - 1
            }
        })
        setFilteredPokemons([...aux])
    }

    function AscporFuerza() {
        var aux = [...pokemons]
        aux.sort((a, b) => {
            if(a.attack > b.attack) {
                return 1
            } else {
                return - 1
            }
        })
        setFilteredPokemons([...aux])
    }

    function DescporFuerza() {
        var aux = [...pokemons]
        aux.sort((a, b) => {
            if(a.attack < b.attack) {
                return 1
            } else {
                return - 1
            }
        })
        setFilteredPokemons([...aux])
    }


    function filter(e){
        dispatch(getPokemonFilter(e.target.value,pokemons))
    }

    function filtApi(e) {
        dispatch(filterApi(e.target.value, pokemons))
      }
//////////////////////////////////////////////////////////////////////
 
     // Get current posts
  const indexOfLastPokemon = currentPokemon * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = filteredPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);

  // Change page
  const paginate = pageNumber => setCurrentPokemon(pageNumber);

  
////////////////////////////////////////////////////////////////////////
    return <div className='detail-wrapper'>
        <div>
        <button class="item-boton" onClick={AscporNombre}>Ordenar Asc por Nombre</button>
        <button class="item-boton" onClick={DescporNombre}>Ordenar Desc por Nombre</button>
        <button class="item-boton" onClick={AscporFuerza}>Ordenar Asc por Fuerza</button>
        <button class="item-boton" onClick={DescporFuerza}>Ordenar Desc por Fuerza</button>
        {/* <span > By Type:</span>
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
            </select>   */}
        <Link to='/filter' style={{textDecoration:'none'}}>
        <button class='item-boton'>Filtrar</button>
        </Link>
            
        
        </div>
        <div className="pokemon-container">
               <div className="all-container">  
        {
            // filteredPokemons.map((pokemon) => {
              
                currentPokemons.map((pokemon) => {
                console.log(currentPokemons)
                return <Link to={`/pokemon/${pokemon?.id}`} style={{textDecoration:'none'}}>
                          <Pokemon key={pokemon?.id} name={pokemon?.name} image={pokemon?.image} attack={pokemon?.attack} tipos={pokemon?.tipos} special />
                       </Link>

            })
               
        }
              </div>
         </div>
        {/* /////////////////////////////// */}
        <Pagination 
           pokemonsPerPage={pokemonsPerPage}
           totalPokemons={filteredPokemons.length}
           paginate={paginate}
          
          />
        {/* /////////////////////////////// */}
    </div>
 
 
}