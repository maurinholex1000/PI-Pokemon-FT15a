export default function Pokemon({name, image,tipos}) {
    return <div>
          
        <p>{name}</p>
        <img src={image} alt="no tengo imagen :/"/>
        
        {tipos.map(tipo => <div> {tipo.name} </div>)}
        
          
        </div>
}