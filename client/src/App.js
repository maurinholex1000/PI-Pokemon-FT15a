import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import {useEffect} from 'react'
import Nav from './components/nav'
import PokemonDetail from './components/pokemonDetail'
import Pokemons from './components/pokemons'
import Pokemon from './components/pokemon'
import PokemonsFilter from './components/pokemonsFilter'
import CreatePokemon from './components/createPokemon'
import Searchbar from './components/searchBar'
import {useDispatch} from 'react-redux'
import { useState } from 'react'
import {getPokemons} from './actions/index'
import { getPokemon } from './actions/index'
import { useSelector } from 'react-redux'
import './App.css';
import './Pagination'


function App() {
  var pokemon = useSelector(state => state.pokemon)
  const [search, setSearch] = useState("");
  const dispatch = useDispatch()
 
  useEffect(() => {
    dispatch(getPokemons())
  }, [])

  
  function buscar(e){
    dispatch(getPokemon(e.target.value))
}


  return (
    <div className="app-contaner">
    <BrowserRouter>
    <Link to="/">
       <Nav />
      </Link>
    <div className="App">
      <Link to="/agregar">
      <button className="item-boton"> AGREGAR POKEMON</button>
      </ Link>
      <div className="searchbar">
        <input onChange={buscar} placeholder="Buscar pokemon..."  />
      </div>
      <Link to="/search">
      <div className="searchbar-btn">
        <button >Buscar</button>
      </div>
      </Link>
      {/*  */}
      <Switch>
        <Route path="/pokemon/:id">
          <PokemonDetail />
        </Route>
        <Route exact path="/">
             <Pokemons />
        </Route>
        
        <Route path="/search">
         <Searchbar/>
        </Route>
        
        <Route path="/agregar">
          <CreatePokemon />
        </Route>

        <Route path="/filter">
         <PokemonsFilter/>
        </Route>

        </Switch>
    </div>
    </ BrowserRouter >
    </div>
  );
}

export default App;
