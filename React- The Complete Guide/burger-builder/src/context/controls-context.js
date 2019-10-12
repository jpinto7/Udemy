import React from 'react';

const controlsContext = React.createContext({
	removeIngredient: () => {},
	addIngredient: () => {},
	disabledInfo: {},
	purchaseHandler: () => {},
	purchaseContinue: () => {}
});

export default controlsContext;