import React from 'react'

class Input extends React.Component {
  constructor(props) {
    super(props)
    const { value } = this.props
    this.state = {
      value
    }
  }
  handleInputChange = event => {
    const { onChange = () => {}, name = '' } = this.props
    const target = event.target
    const value = target.value

    this.setState({ value }, () => {
      onChange(name, value)
    })
  }

  render() {
    const { label, inline = true, type = 'text', placeholder = '', choices = [] } = this.props
    const { value = '' } = this.state

    return (
      <div className='inputGroup'>
        {label && <label>{label}</label>}
        {type == 'text' || type == 'password' || type == 'number' ? (
          <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={this.handleInputChange}
          />
        ) : type == 'select' ? (
          <select onChange={this.handleInputChange} value={value || ''}>
            <option value={''}>Choose an option...</option>
            {choices.map(choice => (
              <option key={choice.id} value={choice.id}>
                {choice.label}
              </option>
            ))}
          </select>
        ) : (
          <textarea onChange={this.handleInputChange} value={value} />
        )}
        <style jsx>{`
          .inputGroup {
            margin-bottom: 16px;
            display: flex;
            flex-direction: ${inline ? 'row' : 'column'};
            justify-content: flex-start;
          }

          label {
            margin-right: 16px;
            color: #878787;
            font-family: 'Open Sans', sans-serif;
            min-width: 100px;
            max-width: ${inline ? '100px' : 'none'};
            display: inline-block;
            padding-top: 16px;
            padding-bottom: ${inline ? '0px' : '16px'};
          }

          input,
          textarea,
          select {
            background-color: #f7f7f7;
            min-height: 40px;
            min-width: 450px;
            border-radius: 2px;
            border: none;
            outline: none;
            padding: 8px;
            padding-left: 16px;
            padding-right: 16px;
            font-size: 16px;
          }

          textarea {
            resize: vertical;
            min-height: 100px;
          }

          select {
            -webkit-appearance: none;
            -moz-appearance: none;
            appearance: none;
          }

          input[type='number'] {
            min-width: 50px !important;
            max-width: 50px !important;
          }
        `}</style>
      </div>
    )
  }
}

export default Input