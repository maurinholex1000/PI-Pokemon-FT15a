import {BrowserRouter, Route, Switch, Link} from 'react-router-dom'
import {useEffect} from 'react'
import Nav from './components/nav'
import PokemonDetail from './components/pokemonDetail'
import Pokemons from './components/pokemons'
import CreatePokemon from './components/createPokemon'
import {useDispatch} from 'react-redux'
import {getPokemons} from './actions/index'
import './App.css';

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPokemons())
  }, [])

  return (
    <BrowserRouter>
    <div className="App">
      <Nav />
      <Link to="/agregar">
      <button> AGREGAR POKEMON </button>
      </ Link>
      <Switch>
        <Route path="/pokemon/:id">
          <PokemonDetail />
        </Route>
        <Route exact path="/">
          <Pokemons />
        </Route>
        <Route exact path="/agregar">
          <CreatePokemon />
        </Route>
        </Switch>
    </div>
    </ BrowserRouter >
  );
}

export default App;
