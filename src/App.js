import React, { Component } from 'react';
import './App.css';

class TimeDisplayal extends React.Component {
  constructor(props){
    super(props);
  
    this.unitsIntervals = [{
      label: 'Seconds',
      value: 60
    },{
      label: 'Minutes',
      value: 60
    },{
      label: 'Hours',
      value: 24
    },{
      label: 'Days',
      value: 7
    },{
      label: 'Weeks',
      value: 52
    },{
      label: 'Years',
      value: 0
    }];
  }
  render() {

    var labeledNumberList = [];
    var timeRemaining = this.props.timeInSeconds;

    this.unitsIntervals.forEach(function(unitInterval) {
      if (labeledNumberList.length > 0 && timeRemaining === 0){
        return;
      }
      var unitValue = unitInterval.value;
      var unitTime = timeRemaining;  
      if(unitValue > 0){
        unitTime %= unitValue;  
      }

      labeledNumberList.push(<li key={unitInterval.label}><LabeledNumber number={unitTime} label={unitInterval.label} /></li>);
      timeRemaining -= unitTime;
      timeRemaining /= unitInterval.value;
    });

    labeledNumberList.reverse();

    return (
      <div className="TimeDisplayal">
        <ul>
          {labeledNumberList}
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


class App extends Component {
  constructor(props){
    super(props);
    this.handleShifterStep = this.handleShifterStep.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleAddTimeCycle = this.handleAddTimeCycle.bind(this);
    this.handleRemoveTimeCycle = this.handleRemoveTimeCycle.bind(this);

    this.state = ({
      cycles: [{
        title: 'Work Length',
        value: 3500000
      },{
        title: 'Break Length',
        value: 1.2
      }]
    });
  }

  handleTitleChange(index, e) {
    var newTitle = e.target.value;
    this.setState((prevState, props) => {
      var counter = prevState.cycles[index];
      counter.title = newTitle;

      return counter;
    });
  }


  handleShifterStep(index, step) {
    this.setState((prevState, props) => {
      var counter = prevState.cycles[index];
      var newValue = counter.value + step;
      counter.value = newValue;

      return counter;
    });
  }

  handleAddTimeCycle() {
    var newCycle = {
      title: "Time Cycle",
      value: 5
    }
    this.setState((prevState, props) => {
      var cycles = prevState.cycles;
      return cycles.push(newCycle);
    });
  }

  handleRemoveTimeCycle(index) {
    this.setState((prevState, props) => {
      var cycles = prevState.cycles;
      cycles.splice(index, 1);
      return cycles;
    });
  }

  render() {
    var timeCycles = this.state.cycles.map(function(cycle) {
      return { 
        title: cycle.title,
        timeInSeconds: Math.floor(cycle.value * 60) 
      };
    });

    var valueShifters = this.state.cycles.map(function(cycle, index) {
      return (
        <div key={index} className="Butts">
          <div className="Shifter">
            <div>
              <input type="text" value={cycle.title} onChange={(e) => this.handleTitleChange(index, e)} />
            </div>
            <NumericValueShifter 
            number={cycle.value}
            onDecrement={() => this.handleShifterStep(index, -1)}
            onIncrement={() => this.handleShifterStep(index, 1)} />
          </div>
          <button className="RemoveTimeCycleButton"onClick={() => this.handleRemoveTimeCycle(index)}>×</button>
        </div>
      );
    }.bind(this));
    
    return (
      <div className="App">
        {valueShifters}
        <br />
        <button className="AddTimeCycleButton" onClick={this.handleAddTimeCycle}>Add Cycle</button>
        <br />
        <StateCycleClock 
          timeCycles={timeCycles}
          />

      </div>
    );
  }
}

export default App;
