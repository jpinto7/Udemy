import React, { useState, useEffect, useRef } from 'react';

import Card from '../UI/Card';
import './Search.css';
import useHttp from '../../hooks/http';
import ErrorModal from '../UI/ErrorModal';

const Search = React.memo(props => {
  const { onLoadIngredients } = props;
  const [filterText, setFilterText] = useState('');
  const inputRef = useRef();

  const { isLoading, data, error, sendRequest, clear } = useHttp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (filterText === inputRef.current.value) {
        const query = filterText.length === 0 ? '' : `?orderBy="title"&equalTo="${filterText}"`;
        sendRequest('https://react-hooks-ingredients-1e3bb.firebaseio.com/ingredients.json' + query, 'GET');
      }
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [filterText, sendRequest, inputRef])

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = [];
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount
        });
      }
      onLoadIngredients(loadedIngredients);
    }
  }, [data, isLoading, error, onLoadIngredients]);

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading...</span>}
          <input ref={inputRef} type="text" value={filterText} onChange={event => {
            setFilterText(event.target.value);
          }} />
        </div>
      </Card>
    </section>
  );
});

export default Search;
