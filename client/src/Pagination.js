import React from 'react';

const Pagination = ({ pokemonsPerPage, totalPokemons, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    
    <div>
      
        {pageNumbers.map(number => (
          
            <button className="item-pagina" onClick={() => paginate(number)} >
              {number}
            </button>
          
        ))}
      
      </div>
  );
};

export default Pagination;