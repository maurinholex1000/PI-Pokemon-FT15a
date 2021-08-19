export default function Nav() {
    let imgUrl =
    "https://raw.githubusercontent.com/PokeAPI/media/master/logo/pokeapi_256.png";
    return <div>
    <nav>
      <div>
        <img src={imgUrl} alt="pokeapi-logo" className="navbar-image" />
      </div>
    </nav>
    </div>
}