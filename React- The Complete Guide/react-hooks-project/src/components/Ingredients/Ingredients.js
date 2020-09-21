import React, { useEffect, useReducer, useCallback } from 'react';

import ErrorModal from '../UI/ErrorModal';
import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import useHttp from '../../hooks/http';

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

function Ingredients() {
  const [ingredients, dispatch] = useReducer(ingredientsReducer, []);
  const {
    isLoading,
    error,
    data,
    extra,
    identifier,
    sendRequest,
    clear,
  } = useHttp();

  useEffect(() => {
    if (!isLoading && !error) {
      switch (identifier) {
        case 'ADD_INGREDIENT':
          dispatch({
            type: 'ADD',
            payload: { id: data.name, ...extra }
          });
          break;
        case 'REMOVE_INGREDIENT':
          dispatch({ type: 'DELETE', payload: extra });
          break;
        default:
          break;
      }
    }
  }, [data, extra, identifier, isLoading, error]);

  const addIngredientHandler = useCallback(ingredient => {
    sendRequest('https://react-hooks-ingredients-1e3bb.firebaseio.com/ingredients.json', 'POST', JSON.stringify(ingredient), ingredient, 'ADD_INGREDIENT');
  }, [sendRequest]);

  const removeIngredientHandler = useCallback(ingredientId => {
   sendRequest(`https://react-hooks-ingredients-1e3bb.firebaseio.com/ingredients/${ingredientId}.json`, 'DELETE', null, ingredientId, 'REMOVE_INGREDIENT');
  }, [sendRequest]);

  const filteredIngredientsHandler = useCallback(ingredients => {
    dispatch({
      type: 'SET',
      payload: ingredients
    });
  }, []);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <IngredientForm onAddIngredient={addIngredientHandler} loading={isLoading} />
      <section>
        <Search onLoadIngredients={filteredIngredientsHandler} />
        <IngredientList ingredients={ingredients} onRemoveItem={removeIngredientHandler} />
      </section>
    </div>
  );
}

export default Ingredients;
