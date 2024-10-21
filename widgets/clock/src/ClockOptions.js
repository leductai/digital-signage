import React, { Component } from 'react'
import { Form, Input } from '../../../components/Form'

class ClockOptions extends Component {
  handleChange = (name, value) => {
    const { onChange = () => {}, data } = this.props
    onChange({ ...data, [name]: value })
  }

  render() {
    const { data: { format, color, backgroundColor, showSeconds } = {} } = this.props
    return (
      <Form>
        <h3>Widget: Clock</h3>
        <p>Customize your clock widget</p>
        <Input
          inline={false}
          label='Time Format'
          type='select'
          name='format'
          value={format}
          choices={[
            { id: '24hour', label: '24-hour' },
            { id: '12hour', label: '12-hour' }
          ]}
          onChange={this.handleChange}
        />
        <Input
          inline={false}
          label='Text Color'
          type='color'
          name='color'
          value={color}
          onChange={this.handleChange}
        />
        <Input
          inline={false}
          label='Background Color'
          type='color'
          name='backgroundColor'
          value={backgroundColor}
          onChange={this.handleChange}
        />
        <Input
          inline={false}
          label='Show Seconds'
          type='checkbox'
          name='showSeconds'
          checked={showSeconds}
          onChange={this.handleChange}
        />
        <style jsx>{`
          h3, p {
            font-family: 'Open Sans', sans-serif;
          }
        `}</style>
      </Form>
    )
  }
}

export default ClockOptions

