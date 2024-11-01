import {Component} from 'react'

import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedSeconds: 0,
  timerLimitInMinutes: 25,
}
class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }
  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimerLimitInMinutes = () => {
    const {timerLimitInMinutes} = this.state

    if (timerLimitInMinutes > 1) {
      this.setState(prevState => ({
        timerLimitInMinutes: prevState.timerLimitInMinutes - 1,
      }))
    }
  }
  onIncreaseTimerLimitInMinutes = () =>
    this.setState(prevState => ({
      timerLimitInMinutes: prevState.timerLimitInMinutes + 1,
    }))
  renderTimerLimitController = () => {
    const {timerLimitInMinutes, timeElapsedSeconds} = this.state
    const isButtonDisabled = timeElapsedSeconds > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="limit-lable"> Set Timer limit</p>
        <div className="timer-limit-controller">
          <button
            className="timer-controller-button "
            disabled={isButtonDisabled}
            onClick={this.onDecreaseTimerLimitInMinutes}
            type="button"
          >
            -
          </button>
          <div className="limit-lable-and-value-containet">
            <p className="limit-value">{timerLimitInMinutes}</p>
          </div>
          <button
            className="timer-controller-button"
            disabled={isButtonDisabled}
            onClick={this.onIncreaseTimerLimitInMinutes}
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }
  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }
  incrementTimeElapsedInSeconds = () => {
    const {timerLimitInMinutes, timeElapsedSeconds} = this.state
    const isTimerCompleted = timeElapsedSeconds === timerLimitInMinutes * 60

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedSeconds: prevState.timeElapsedSeconds + 1,
      }))
    }
  }
  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedSeconds, timerLimitInMinutes} = this.state
    const isTimerCompleted = timeElapsedSeconds === timerLimitInMinutes * 60
    if (isTimerCompleted) {
      this.setState({timeElapsedSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 100)
    }
    this.setState(prevState => ({isTimerRunning: !prevState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state
    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-btn"
          onClick={this.onStartOrPauseTimer}
          type="button"
        >
          <img
            alt={startOrPauseAltText}
            className="timer-controller-icon"
            src={startOrPauseImageUrl}
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'paust' : 'Start'}
          </p>
        </button>
        <button
          className="timer-controller-btn"
          onClick={this.onResetTimer}
          type="button"
        >
          <img
            alt="reset icon"
            className="timer-controller-icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }
  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedSeconds, timerLimitInMinutes} = this.state
    const totalRemaingSeconds = timerLimitInMinutes * 60 - timeElapsedSeconds
    const minutes = Math.floor(totalRemaingSeconds / 60)
    const seconds = Math.floor(totalRemaingSeconds % 60)
    const stringFiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringFiedSecond = seconds > 9 ? seconds : `0${seconds}`
    return `${stringFiedMinutes}:${stringFiedSecond}`
  }
  render() {
    const {isTimerCompleted, isTimerRunning} = this.state
    const lableText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-timer-container ">
          <div className="timer-display-container">
            <div className="elapsed-time-container">
              <h1 className="elapsed-timer">
                {this.getElapsedSecondsInTimeFormat()}
              </h1>
              <p className="timer-state ">{lableText}</p>
            </div>
          </div>{' '}
          <div className="control-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
