//single count down timer

//count down timer collection that loops through countdown timers

class CountdownTimer extends React.Component {
  constructor(props) {
    super(props);

    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.tick = this.tick.bind(this);

    this.state = {
      remainingTime : props.timeInSeconds
    };
  }

  tick() {
    this.state.setState((prevState, props) => {
      return {remainingTime: prevState - 1}
    });
  }

  startTimer() {
    if (this.timerID != null) {
      this.stopTimer();
    }

    this.timerID = setInterval(1000);
    this.setState(remainingTime: this.props.timeInSeconds);
  }

  stopTimer() {
    clearInterval(this.timerID);
  }

  render() {
    var sec = this.state.remainingTime % 60;
    var min = Math.floow(this.state.remainingTime / 60) * 60;

    return (
      <div>
        <h1>{title}</h1>
        <p>{min}:{sec}</p>
        <button onClick={this.startTimer}>click to start</button>
      </div>
    );
  }
}