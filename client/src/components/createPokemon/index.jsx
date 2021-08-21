import {useState, useEffect} from 'react'
import axios from 'axios'
import React from 'react';
export default function CreatePokemon(){
    const [errors, setErrors] = React.useState({});

    const [pokemon, setPokemon] = useState({
        name:'',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height:'',
        weight: '',
        tipos: []
    })
    
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

    function onInputChange(e) {
        setPokemon((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
        setPokemon({
            ...pokemon,
            [e.target.name]: e.target.value
          });
        setErrors(validate({
            ...pokemon,
            [e.target.name]: e.target.value
          }));
    }

    function agregarTipoAlPokemon(id) {
        setPokemon({
            ...pokemon,
            tipos: [...pokemon.tipos, id]
        })

        
    }

    async function handleSubmit(e) {
        e.preventDefault()
        await axios.post('http://localhost:3001/pokemons/', pokemon)
        console.log(pokemon)
        setPokemon({
        name:'',
        image: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        height:'',
        weight: '',
        tipos: []
    });
        alert('se agrego el pokemon')
    }
    
    return  <div className="forma">
      <form onSubmit={handleSubmit}>
        {/* <div className="thumb-container-form"> */}
        <div className="item">    
        <p className="item">
        <h3 htmlFor="">Nombre</h3>
        <input
            className={errors.name && 'danger'}
            type="text"
            name="name"
            value={pokemon.name}
            onChange={onInputChange}/>
        {errors.name && (
        <p className="danger">{errors.name}</p>
                )}
        </p>
        <p className="item"> 
        <h3 htmlFor="">Imagen</h3>
        <input
            type="text"
            name="image"
            value={pokemon.image}
            onChange={onInputChange}/>
        </p>
        <p className="item"> 
        <h3 htmlFor="">Hp</h3>
        <input
            className={errors.hp && 'danger'}
            type="text"
            name="hp"
            value={pokemon.hp}
            onChange={onInputChange}/>
            {errors.hp && (
                <p className="danger">{errors.hp}</p>
                )}
        </p>
        
       
        <p className="item"> 
        <h3 htmlFor="">Fuerza</h3>
        <input
            className={errors.attack && 'danger'}
            type="text"
            name="attack"
            value={pokemon.attack}
            onChange={onInputChange}/>
            {errors.attack && (
              <p className="danger">{errors.attack}</p>
                )}
        </p>
        <p className="item"> 
        <h3 htmlFor="">Defensa</h3>
        <input
            className={errors.defense && 'danger'}
            type="text"
            name="defense"
            value={pokemon.defense}
            onChange={onInputChange}/>
            {errors.defense && (
                <p className="danger">{errors.defense}</p>
                )}
        </p>
        <p className="item"> 
        <h3 htmlFor="">Velocidad</h3>
        <input
            className={errors.speed && 'danger'}
            type="text"
            name="speed"
            value={pokemon.speed}
            onChange={onInputChange}/>
            {errors.speed && (
                <p className="danger">{errors.speed}</p>
                )}
        </p>
        
        <p className="item"> 
        <h3 htmlFor="">Altura</h3>
        <input
            className={errors.height && 'danger'}
            type="text"
            name="height"
            value={pokemon.height}
            onChange={onInputChange}/>
            {errors.height && (
                <p className="danger">{errors.height}</p>
                )}
        </p>
        <p className="item"> 
        <h3 htmlFor="">Peso</h3>
        <input
            className={errors.weight && 'danger'}
            type="text"
            name="weight"
            value={pokemon.weight}
            onChange={onInputChange}/>
            {errors.weight && (
                <p className="danger">{errors.weight}</p>
                )}
        </p>
        
          
        <div className='item'>
            {tipos.map((tipo,index) => {
                return <div class="item">
                    <h3>{tipo.name}</h3>
                    <buttton className='boton-form'key={index} onClick={() => agregarTipoAlPokemon(tipo.id)}>
                            AGREGAR
                    </buttton>
                </div>
            })} 
            
          

        </div>
        
        </div>
        <input type="submit"/>
        
     {/* </div> */}
    </form>
    </div>
}

export function validate(pokemon) {
    let errors = {};
    if (!pokemon.name) {
      errors.name = 'PokeName is required';
    } else if (!/^[A-Za-z]+$/.test(pokemon.name)) {
      errors.name = 'PokeName must be a text string';
    }
    if (!pokemon.hp) {
      errors.hp = 'Hp is required';
    } else if (!/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/.test(pokemon.hp)) {
      errors.hp = 'Hp must be between 1 and 255';
    }
    if (!pokemon.attack) {
      errors.attack = 'Attack is required';
    } else if (!/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/.test(pokemon.attack)) {
      errors.attack = 'Attack must be between 1 and 255';
    }
    if (!pokemon.defense) {
      errors.defense = 'Defense is required';
    } else if (!/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/.test(pokemon.defense)) {
      errors.defense = 'Defense must be between 1 and 255';
    }
    if (!pokemon.speed) {
      errors.speed = 'Speed is required';
    } else if (!/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/.test(pokemon.speed)) {
      errors.speed = 'Speed must be between 1 and 255';
    }
    if (!pokemon.height) {
      errors.height = 'Heigth is required';
    } else if (!/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/.test(pokemon.height)) {
      errors.height = 'Heigth must be between 1 and 255';
    }
    if (!pokemon.weight) {
      errors.weight = 'Weigth is required';
    } else if (!/^([0-9]{1,2}|1[0-9]{1,2}|2[0-4][0-9]|25[0-5])$/.test(pokemon.weight)) {
      errors.weight = 'Weigth must be between 1 and 255';
    }
     
    if (!pokemon.tipos || pokemon.tipos === "null") {
      errors.tipos = 'Type can not be null';
    } 
    return errors;

    
    

    
};