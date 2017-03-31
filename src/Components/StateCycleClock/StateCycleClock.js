import React from 'react';
import CountDownTimer from '../CountDownTimer/CountDownTimer';

export default class StateCycleClock extends React.Component {
  constructor(props) {
    super(props);
    this.handleTimerFinished = this.handleTimerFinished.bind(this);
    this.handleTimerToggle = this.handleTimerToggle.bind(this);
    this.state = {
      isRunning: false,
      currentCycleIndex: 0
    };
  }

  handleTimerToggle() {
    this.setState((prevState, props) => {
      return {isRunning: !prevState.isRunning};
    });
  }

  handleTimerFinished() {
    this.setState((prevState, props) => {
      var nextCycleIndex = prevState.currentCycleIndex + 1;
      nextCycleIndex = nextCycleIndex < props.timeCycles.length ? nextCycleIndex : 0;
      return {currentCycleIndex: nextCycleIndex};
    });
  }
  
  render() {
    var currentCycleIndex = Math.min(this.state.currentCycleIndex, this.props.timeCycles.length - 1);
    var currentCycle = this.props.timeCycles[currentCycleIndex];
    
    var title = currentCycle != null ? currentCycle.title : "";
    var timeInSeconds = currentCycle != null ? currentCycle.timeInSeconds : 0;

    var buttonText = this.state.isRunning ? "Pause" : "Start";

    return (
      <div className="StateCycleClock">
        <p className="StateCycleClockTitle">{title}</p>
        <CountDownTimer
          timeInSeconds={timeInSeconds} 
          running={this.state.isRunning}
          onTimerDone={this.handleTimerFinished}
          />
          <br />
        <button className="TimerButton" onClick={this.handleTimerToggle}>{buttonText}</button>
      </div>
    );
  }
}
