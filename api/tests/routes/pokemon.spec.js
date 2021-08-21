/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  // before(() => conn.authenticate()
  // .catch((err) => {
  //   console.error('Unable to connect to the database:', err);
  // }));
  // beforeEach(() => Pokemon.sync({ force: true })
  //   .then(() => Pokemon.create(pokemon)));
  // describe('GET /pokemons', () => {
  //   it('should get 200', () =>
  //     agent.get('/pokemons').expect(200)
  //   );
  // });
 
  describe('GET /pokemons?name=pikachu', () => {
    it('responds with 200', () => agent.get('/pokemons?name=pikachu').expect(200));
    it('search for pokemons by their names', () =>
      agent.get('/pokemons?name=pikachu').expect({"id":25,"name":"pikachu","tipo":[{"id":13,"name":"electric"}],"attack":55,"hp":35,"defense":40,"speed":90,"weight":60,"height":4,"image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"})
    );
  });
  describe('GET /pokemons/:id', () => {
    it('responds with 200', () => agent.get('/pokemons/1').expect(200));
    it('search pokemons by their ID', () =>
      agent.get('/pokemons/1').expect({"id":1,"name":"bulbasaur","tipos":[{"id":12,"name":"grass"} ,{"id":4,"name":"poison"}],"hp":45,"attack":49,"defense":49,"speed":45,"weight":69,"height":7,"image":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"})
    );
  });
  describe('POST /pokemons', () => {
    it('Add a new Pokemon', () =>{
      const post={"name":"bulbasaur","tipos":["grass","poison"],"hp":45,"attack":49,"defense":49,"speed":45,"weight":69,"height":7,"img":"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"}
      agent.post('/pokemons')
      .send(post)
      .then((res)=>{
        expect(res.body.results.nombre).to.be.equal("bulbasaur")
      })
    });
  });

});
