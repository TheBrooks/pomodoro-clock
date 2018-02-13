import React, { Component } from 'react';
import './App.css';

import NumericValueShifter from './Components/NumericValueShifter/NumericValueShifter';
import StateCycleClock from './Components/StateCycleClock/StateCycleClock';



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
        value: 35
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
