import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '@store/modules/counter';
import { PopUpManager } from '@components/common/PopUpManager';

const Home = props => (
  <div>
    <div>
      <h1>Home</h1>
      <p>Count: {props.count}</p>

      <p>
        <button onClick={props.increment} disabled={props.isIncrementing}>
          Increment
        </button>
        <button onClick={props.incrementAsync} disabled={props.isIncrementing}>
          Increment Async
        </button>
      </p>

      <p>
        <button onClick={props.decrement} disabled={props.isDecrementing}>
          Decrement
        </button>
        <button onClick={props.decrementAsync} disabled={props.isDecrementing}>
          Decrement Async
        </button>
      </p>

      <p>
        <button onClick={() => props.changePage()}>
          Go to about page via redux
        </button>
      </p>
    </div>
    <PopUpManager>
      popup
    </PopUpManager>
  </div>
);

const mapStateToProps = state => ({
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      increment,
      incrementAsync,
      decrement,
      decrementAsync,
      changePage: () => push('/about-us')
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Home);
