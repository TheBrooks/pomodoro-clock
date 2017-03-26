class CountDownTimer extends React.Component {
  constructor(props){
    super(props);
    this.tick = this.tick.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.pauseTimer = this.pauseTime.bind(this);

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

  componentWillReceiveProps(nextProps) {
    if (nextProps.running != this.props.running){
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