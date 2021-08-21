import React from "react";
import axios from "axios";
import Pokemon from "../pokemon"
import { Link } from "react-router-dom";
import { getPokemon } from "../../actions";
import { useSelector} from "react-redux";
const { useState } = React;


const Searchbar = () => {
  //const { onSearch } = props;
  var pokemon = useSelector(state => state.pokemon)
  const [notFound, setNotFound] = useState(false);
  
  console.log(pokemon)
  if(pokemon === null) {
    return (
        <div>
            <h1>Pokemon NOT FOUND!!</h1>
            <img src='https://media.giphy.com/media/yuI7fL5cR1YeA/giphy.gif' alt='pokemon img'/>
        </div>
        )


    }else if(pokemon===undefined){
  return (
    <div className='loading'>
         <h1>LOADING</h1>
        <img src='https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif' alt='pokemon img'/>
    </div>
    )
}else{
 
  return (
    <div className="searchbar-container">
        
        <Link to={`/pokemon/${pokemon.id}`} style={{textDecoration:'none'}}>
          {console.log(pokemon.name)}
            <Pokemon key={pokemon.id} name={pokemon.name} image={pokemon.image} tipos={pokemon.tipos} />
        </Link>

      </div>
    
  )
}
}

export default Searchbar;
