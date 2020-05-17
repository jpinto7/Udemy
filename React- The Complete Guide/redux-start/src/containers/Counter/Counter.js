import React from 'react';
import { connect } from 'react-redux';
import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import actionCreators from './actions';

const Counter = props => (
    <div>
        <CounterOutput value={props.ctr} />
        <CounterControl label="Increment" clicked={() => props.incrementCounter()} />
        <CounterControl label="Decrement" clicked={() => props.decrementCounter()}  />
        <CounterControl label="Add 5" clicked={() => props.addCounter(5)}  />
        <CounterControl label="Subtract 5" clicked={() => props.substractCounter(5)}  />
    </div>    
);

const mapStateToProps = state => ({
    ctr: state.counter
});

export default connect(mapStateToProps, actionCreators)(Counter);
