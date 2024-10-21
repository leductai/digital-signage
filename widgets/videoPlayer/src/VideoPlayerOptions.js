import React, { Component } from 'react'
import { Form, Input } from '../../../components/Form'

class VideoPlayerOptions extends Component {
  handleChange = (name, value) => {
    const { onChange = () => {}, data } = this.props
    onChange({ ...data, [name]: value })
  }

  render() {
    const { data: { loop, autoplay, muted } = {} } = this.props
    return (
      <Form>
        <h3>Widget: Video Player</h3>
        <p>Customize your video player settings</p>
        <Input
          inline={false}
          label='Loop Playlist'
          type='checkbox'
          name='loop'
          checked={loop}
          onChange={this.handleChange}
        />
        <Input
          inline={false}
          label='Autoplay'
          type='checkbox'
          name='autoplay'
          checked={autoplay}
          onChange={this.handleChange}
        />
        <Input
          inline={false}
          label='Muted'
          type='checkbox'
          name='muted'
          checked={muted}
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

export default VideoPlayerOptions
