import {useState, useEffect} from 'react'
import axios from 'axios'
export default function CreatePokemon(){
    //const {name, image, episodes} = req.body
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
        alert('se agrego el pokemon')
    }
    return <form onSubmit={handleSubmit}>
        <p>
        <label htmlFor="">Nombre</label>
        <input
            type="text"
            name="name"
            value={pokemon.name}
            onChange={onInputChange}/>
        </p>
        <p> 
        <label htmlFor="">Imagen</label>
        <input
            type="text"
            name="image"
            value={pokemon.image}
            onChange={onInputChange}/>
        </p>
        <p> 
        <label htmlFor="">Hp</label>
        <input
            type="text"
            name="hp"
            value={pokemon.hp}
            onChange={onInputChange}/>
        </p>
        <p> 
        <label htmlFor="">Fuerza</label>
        <input
            type="text"
            name="attack"
            value={pokemon.attack}
            onChange={onInputChange}/>
        </p>
        <p> 
        <label htmlFor="">Defensa</label>
        <input
            type="text"
            name="defense"
            value={pokemon.defense}
            onChange={onInputChange}/>
        </p>
        <p> 
        <label htmlFor="">Velocidad</label>
        <input
            type="text"
            name="speed"
            value={pokemon.speed}
            onChange={onInputChange}/>
        </p>
        <p> 
        <label htmlFor="">Altura</label>
        <input
            type="text"
            name="height"
            value={pokemon.height}
            onChange={onInputChange}/>
        </p>
        <p> 
        <label htmlFor="">Peso</label>
        <input
            type="text"
            name="weight"
            value={pokemon.weight}
            onChange={onInputChange}/>
        </p>
        
        <div>
            {tipos.map(tipo => {
                return <div>
                    {tipo.name}
                    <buttton 
                        onClick={() => agregarTipoAlPokemon(tipo.id)}>
                            Agregar al pokemon
                    </buttton>
                </div>
            })}
        </div>
        <input type="submit"/>
    </form>
}