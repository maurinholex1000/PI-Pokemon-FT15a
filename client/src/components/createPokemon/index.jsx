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
        <div className="thumb-container-form">
        <div className="item">    
        <p className="item">
        <h3 htmlFor="">Nombre</h3>
        <input
            type="text"
            name="name"
            value={pokemon.name}
            onChange={onInputChange}/>
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
            type="text"
            name="hp"
            value={pokemon.hp}
            onChange={onInputChange}/>
        </p>
        
       
        <p className="item"> 
        <h3 htmlFor="">Fuerza</h3>
        <input
            type="text"
            name="attack"
            value={pokemon.attack}
            onChange={onInputChange}/>
        </p>
        <p className="item"> 
        <h3 htmlFor="">Defensa</h3>
        <input
            type="text"
            name="defense"
            value={pokemon.defense}
            onChange={onInputChange}/>
        </p>
        <p className="item"> 
        <h3 htmlFor="">Velocidad</h3>
        <input
            type="text"
            name="speed"
            value={pokemon.speed}
            onChange={onInputChange}/>
        </p>
        
        <p className="item"> 
        <h3 htmlFor="">Altura</h3>
        <input
            type="text"
            name="height"
            value={pokemon.height}
            onChange={onInputChange}/>
        </p>
        <p className="item"> 
        <h3 htmlFor="">Peso</h3>
        <input
            type="text"
            name="weight"
            value={pokemon.weight}
            onChange={onInputChange}/>
        </p>
        </div>
        <div>
            {tipos.map(tipo => {
                return <div class="item">
                    {tipo.name}
                    <button 
                        onClick={() => agregarTipoAlPokemon(tipo.id)}>
                            AGREGAR
                    </button>
                </div>
            })}
        </div>
        <input type="submit"/>
     </div>
    </form>
}