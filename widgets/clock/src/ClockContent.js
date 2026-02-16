import React, { Component } from 'react'
import moment from 'moment'

class ClockContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      time: moment()
    }
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState({
      time: moment()
    })
  }

  render() {
    const { data: { format, color, backgroundColor, showSeconds } = {} } = this.props
    const { time } = this.state
    
    const timeFormat = format === '24hour' ? 'HH:mm' : 'hh:mm A'
    const timeString = showSeconds ? time.format(`${timeFormat}:ss`) : time.format(timeFormat)

    return (
      <div className='clock'>
        <div className='time'>{timeString}</div>
        <style jsx>{`
          .clock {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
            width: 100%;
            background-color: ${backgroundColor};
            color: ${color};
            font-family: 'Open Sans', sans-serif;
          }
          .time {
            font-size: 3em;
            font-weight: bold;
          }
        `}</style>
      </div>
    )
  }
}

export default ClockContent

