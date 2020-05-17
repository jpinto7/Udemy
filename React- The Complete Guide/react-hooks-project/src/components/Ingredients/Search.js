import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [filterText, setFilterText] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filterText === inputRef.current.value) {
        const query = filterText.length === 0 ? '' : `?orderBy="title"&equalTo="${filterText}"`;
        fetch('https://react-hooks-ingredients-1e3bb.firebaseio.com/ingredients.json' + query).then(response => response.json())
        .then(data => {
          const loadedIngredients = [];
          for (const key in data) {
            loadedIngredients.push({
              id: key,
              title: data[key].title,
              amount: data[key].amount
            });
          }
    
          onLoadIngredients(loadedIngredients);
        });        
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [filterText, onLoadIngredients, inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input ref={inputRef} type="text" value={filterText} onChange={event => {
            setFilterText(event.target.value);
          }} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
