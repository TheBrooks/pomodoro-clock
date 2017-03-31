import React from 'react';
import LabeledNumber from '../LabeledNumber/LabeledNumber';

export default class TimeDisplayal extends React.Component {
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
