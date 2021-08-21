const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Pokemon.create({ name: 'Pikachu' });
      });
      it('their ID are unique',(done)=>{
        var pokemonCreado1=  Pokemon.create({name: 'Pikachu'})
        var pokemonCreado2=  Pokemon.create({name: 'Parchu'})
        done(pokemonCreado1.id !== pokemonCreado2.id)
    });

    it('should succeed on correct data', async () => {
      const pokemon = await Pokemon.create({
        name:"pikachu",hp:35,attack:55,defense:40,speed:90,weight:60,height:4,image:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg"}
                );  
      
      const breed = pokemon.dataValues;
      // console.log(dog);
      expect(pokemon).to.exist;
      expect(breed.id).to.exist;
      expect(breed.name).to.exist;
      expect(breed.height).to.exist;
      expect(breed.weight).to.exist;
      expect(breed.attack).to.exist;
      expect(breed.image).to.exist;
expect(breed.id).to.be.a('string');
      expect(breed.name).to.be.a('string');
      expect(breed.height).to.be.a('string');
      expect(breed.weight).to.be.a('string');
      expect(breed.attack).to.be.a('string');
      expect(breed.image).to.be.a('string');

      });
  });
  });

 
});


