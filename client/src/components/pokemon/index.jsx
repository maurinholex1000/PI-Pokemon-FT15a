export default function Pokemon({name, image,attack,tipos}) {
    console.log(tipos)
    const style = tipos[0].name+" thumb-container"
    return <div className={style}>
          
        
        <img src={image} alt="no tengo imagen :/"/>
        <p>{attack}</p>
        <div className="detail-wrapper">
         <h3>{name}</h3>
         {tipos.map(tipo => <small> {tipo.name} </small>)}
        </div>
          
        </div>
}