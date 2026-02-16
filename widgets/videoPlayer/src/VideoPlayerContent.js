import React, { Component } from 'react'
import axios from 'axios'

class VideoPlayerContent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videos: [],
      currentVideoIndex: 0
    }
    this.videoRef = React.createRef()
  }

  componentDidMount() {
    this.fetchVideos()
  }

  fetchVideos = async () => {
    try {
      const response = await axios.get('/api/v1/videos')
      this.setState({ videos: response.data }, () => {
        if (this.state.videos.length > 0) {
          this.playVideo()
        }
      })
    } catch (error) {
      console.error('Error fetching videos:', error)
    }
  }

  playVideo = () => {
    if (this.videoRef.current) {
      this.videoRef.current.play()
    }
  }

  handleVideoEnd = () => {
    const { videos, currentVideoIndex } = this.state
    const { data: { loop } } = this.props
    
    let nextIndex = currentVideoIndex + 1
    if (nextIndex >= videos.length) {
      if (loop) {
        nextIndex = 0
      } else {
        return
      }
    }
    
    this.setState({ currentVideoIndex: nextIndex }, this.playVideo)
  }

  render() {
    const { videos, currentVideoIndex } = this.state
    const { data: { autoplay, muted } } = this.props

    if (videos.length === 0) {
      return <div>No videos available</div>
    }

    const currentVideo = videos[currentVideoIndex]

    return (
      <div className='video-player'>
        <video
          ref={this.videoRef}
          src={`/uploads/${currentVideo.filename}`}
          autoPlay={autoplay}
          muted={muted}
          onEnded={this.handleVideoEnd}
        />
        <style jsx>{`
          .video-player {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: black;
          }
          video {
            max-width: 100%;
            max-height: 100%;
          }
        `}</style>
      </div>
    )
  }
}

export default VideoPlayerContent
