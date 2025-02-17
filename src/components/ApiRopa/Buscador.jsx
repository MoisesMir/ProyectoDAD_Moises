import React, { useState } from 'react';
import { InstantSearch, SearchBox, Hits, Configure } from 'react-instantsearch-dom';
import algoliasearch from 'algoliasearch';
import './Buscador.css';

const searchClient = algoliasearch('OXJ4A4V76Y', 'cd32265fffc584cd2dcfbbfc157832d5');


const HitComponent = ({ hit }) => (
  <div className="result-item">
    <img src={hit.image} alt={hit.title} className="result-item-img" />
    <div className="result-item-info">
      <h4>{hit.title}</h4>
      <p>{hit.description}</p>
    </div>
  </div>
);

export const Buscador = () => {
  const [showResults, setShowResults] = useState(false);

  const handleSearchChange = (event) => {
    setShowResults(event.target.value.length > 0);
      e.target.setAttribute('type', 'text');  // Cambia a texto temporalmente
      setTimeout(() => e.target.setAttribute('type', 'search'), 0);  // Vuelve a tipo "search"    
  };

  return (
    <div className="buscador-dropdown">
      <InstantSearch searchClient={searchClient} indexName="id">
        <div className="search-header">
          <SearchBox
            className="search-box"
            onInput={handleSearchChange}
            translations={{ placeholder: "Buscar ropa..." }}
          />
        </div>
        {showResults && (
          <div className="results-dropdown">
            <Hits hitComponent={HitComponent} />
          </div>
        )}
        <Configure hitsPerPage={5} />
      </InstantSearch>
    </div>
  );
};
