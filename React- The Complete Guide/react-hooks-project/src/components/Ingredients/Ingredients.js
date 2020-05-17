import React, { useReducer, useCallback } from 'react';

import ErrorModal from '../UI/ErrorModal';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';

const ingredientsReducer = (state, { type, payload }) => {
  switch (type) {
    case 'SET':
      return payload;
    case 'ADD':
      return [...state, payload];
    case 'DELETE':
      return state.filter(({ id }) => id !== payload);
    default:
      return state;
  }
};

const httpReducer = (state, { type, payload}) => {
  switch (type) {
    case 'SEND':
      return {
        loading: true,
        error: null
      };
    case 'RESPONSE':
      return {
        ...state,
        loading: false
      };
    case 'ERROR':
      return {
        loading: false,
        error: payload
      };
    case 'CLEAR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientsReducer, []);
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    loading: false,
    error: null
  });
  //const [ingredients, setIngredients] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState();

  const addIngredientHandler = ingredient => {
    dispatchHttp({ type: 'SEND' });
    fetch('https://react-hooks-ingredients-1e3bb.firebaseio.com/ingredients.json', {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      dispatchHttp({ type: 'RESPONSE' });
      return response.json();
    })
    .then(data => {
      dispatch({
        type: 'ADD',
        payload: {id: data.name, ...ingredient}
      });
    });
  };

  const removeIngredientHandler = ingredientId => {
    dispatchHttp({ type: 'SEND' });
    fetch(`https://react-hooks-ingredients-1e3bb.firebaseio.com/ingredients/${ingredientId}.json`, {
      method: 'DELETE'
    })
    .then(() => {
      dispatchHttp({ type: 'RESPONSE' });
      // setIngredients(prevIngredients => {
      //   return prevIngredients.filter(({ id }) => id !== ingredientId);
      // });
      dispatch({
        type: 'DELETE',
        payload: ingredientId
      });
    })
    .catch(error => {
      dispatchHttp({ type: 'ERROR', payload: 'Something went wrong!' });
    });
  };

  const filteredIngredientsHandler = useCallback(ingredients => {
    dispatch({
      type: 'SET',
      payload: ingredients
    });
    //setIngredients(ingredients);
  }, []);

  const clearError = () => {
    dispatchHttp({ type: 'CLEAR' });
  };

  return (
    <div className="App">
      {httpState.error && <ErrorModal onClose={clearError}>{httpState.error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={httpState.loading} />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
