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


  return (
    <div className="searchbar-container">
      
      <div>  
        
        
        
        <Link to={`/pokemon/${pokemon.id}`} style={{textDecoration:'none'}}>
          {console.log(pokemon.name)}
            <Pokemon key={pokemon.id} name={pokemon.name} image={pokemon.image} tipos={pokemon.tipos} />
            
        </Link>
        
        
        
      </div>
    </div>
  );

};

export default Searchbar;
