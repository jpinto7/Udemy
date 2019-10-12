import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import BuildControl from '../BuildControl';

const controls = [
	{
		label: 'Salad',
		type: 'salad'
	},
	{
		label: 'Bacon',
		type: 'bacon'
	},
	{
		label: 'Cheese',
		type: 'cheese'
	},
	{
		label: 'Meat',
		type: 'meat'
	}	
];

const BuildControls = props => {
	return (
		<div className={styles.BuildControls}>
			<p>Current Price: <strong>{props.currentPrice.toFixed(2)}</strong></p>
			{controls.map(control => (
				<BuildControl
					key={control.type}
					{...control}
				/>
			))}
			<button
				className={styles.OrderButton}
				disabled={!props.purchaseable}
				onClick={props.ordered}
			>
				ORDER NOW
			</button>
		</div>
	);
};

BuildControls.propTypes = {
	currentPrice: PropTypes.number.isRequired,
	purchaseable: PropTypes.bool.isRequired,
	ordered: PropTypes.func.isRequired
};

export default BuildControls;