import React, { Component } from 'react';
import './App.css';


class TimeDisplayal extends React.Component {
  render() {
    //dynamically render this list

    var timeRemaining = this.props.timeInSeconds;
    var seconds = timeRemaining % 60;
    var minutes = (timeRemaining - seconds) / 60;

    return (
      <div className="TimeDisplayal">
        <ul>
          <li>
            <LabeledNumber
              label="Minutes"
              number={minutes}
            />
          </li>
          <li>
            <LabeledNumber
              label="Seconds"
              number={seconds}
            />
          </li>
        </ul>
      </div>
    ); 
  }
}

class NumericValueShifter extends React.Component {
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

function LabeledNumber(props) {
  return (
    <div className="LabeledNumber">
      <h3 className="Number">{props.number}</h3>
      <p className="Label">{props.label}</p>
    </div>
  );
}

class CountDownTimer extends React.Component {
  constructor(props){
    super(props);
    this.tick = this.tick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTimer.bind(this);

    this.state = {
      timeElapsed: 0
    };
  }

  startTimer() {
    this.timerID = setInterval(this.tick, 1000);
  }

  pauseTimer() {
    clearInterval(this.timerID);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.running !== this.props.running){
      if (nextProps.running) {
        this.startTimer();
      }
      else {
        this.pauseTimer();
      }
    }
  }

  componentWillUnmount() {
    this.timerID && clearInterval(this.timerID);
    this.timerID = false;
  }

  tick() {
    var timeElapsed = 0;
    this.setState((prevState, props) => {
      timeElapsed = prevState.timeElapsed + 1;
      return {timeElapsed: timeElapsed};
    });

    if (timeElapsed >= this.props.timeInSeconds) {
      this.setState({timeElapsed: 0});
      this.props.onTimerDone();
    }
  }

  render() {    
    var timeRemaining = Math.max(this.props.timeInSeconds - this.state.timeElapsed, 0);

    return (
      <div className="CounterTimer">
        <TimeDisplayal
          timeInSeconds={timeRemaining}
          />
      </div>
    );
  }
}

class StateCycleClock extends React.Component {
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

  componentWillReceiveProps(nextProps) {
    //if cycleTimes change
      // check the index or set it to 0
  }

  render() {
    var currentCycleIndex = Math.min(this.state.currentCycleIndex, this.props.timeCycles.length - 1);
    var currentCycle = this.props.timeCycles[currentCycleIndex];

    var buttonText = this.state.isRunning ? "Pause" : "Start";

    return (
      <div className="StateCycleClock">
        <p className="StateCycleClockTitle">{currentCycle.title}</p>
        <CountDownTimer
          timeInSeconds={currentCycle.timeInSeconds} 
          running={this.state.isRunning}
          onTimerDone={this.handleTimerFinished}
          />
          <br />
        <button className="TimerButton" onClick={this.handleTimerToggle}>{buttonText}</button>
      </div>
    );
  }
}


class App extends Component {
  constructor(props){
    super(props);
    this.handleShifterStep = this.handleShifterStep.bind(this);

    this.state = ({
      breakCounter: {
        value: 5
      },
      workCounter: {
        value: 25
      }
    });

  }


  handleShifterStep(counterStr, step) {
    this.setState((prevState, props) => {
      var counter = prevState[counterStr];
      var newValue = counter.value + step;
      counter.value = newValue;

      return counter;
    });
  }

  render() {
    var timeCycles = [{
      title: 'Work',
      timeInSeconds: this.state.workCounter.value * 60
    },{
      title: 'Break',
      timeInSeconds: this.state.breakCounter.value * 60
    }];
    
    return (
      <div className="App">
        <div className="Shifter">
          BREAK LENGTH
          <NumericValueShifter 
          number={this.state.breakCounter.value}
          onDecrement={() => this.handleShifterStep('breakCounter', -1)}
          onIncrement={() => this.handleShifterStep('breakCounter', 1)} />
        </div>
        <div className="Shifter">
          WORK LENGTH
          <NumericValueShifter 
            number={this.state.workCounter.value}
            onDecrement={() => this.handleShifterStep('workCounter', -1)}
            onIncrement={() => this.handleShifterStep('workCounter', 1)} />
        </div>
        <br />
        <StateCycleClock 
          timeCycles={timeCycles}
          />

      </div>
    );
  }
}

export default App;
