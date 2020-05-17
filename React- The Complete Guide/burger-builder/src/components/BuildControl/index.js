import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';
import ControlsContext from '../../context/controls-context';

const BuildControl = props => {
	const controlsContext = useContext(ControlsContext);
	return (
		<div className={styles.BuildControl}>
			<div className={styles.Label}>{props.label}</div>
			<button
				className={styles.Less}
				onClick={() => { controlsContext.removeIngredient(props.type) }}
				disabled={controlsContext.disabledInfo[props.type]}
			>
				Less
			</button>
			<button
				className={styles.More}
				onClick={() => { controlsContext.addIngredient(props.type) }}
			>
				More
			</button>
		</div>
	);
};

BuildControl.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.string.isRequired
};

export default BuildControl;
