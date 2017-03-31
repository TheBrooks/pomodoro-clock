import React from 'react';

export default class NumericValueShifter extends React.Component {
  constructor(props) {
    super(props);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  handleDecrement() {
    this.props.onDecrement();
  }

  handleIncrement() {
    this.props.onIncrement();
  }

  render() {
    return (
      <div className="NumericValueShifter">
          <button onClick={this.handleDecrement}>-</button>
          <span>{this.props.number}</span>
          <button onClick={this.handleIncrement}>+</button>
      </div>
    );
  }
}