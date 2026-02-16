import BaseWidget from '../base_widget'
import VideoPlayerContent from './src/VideoPlayerContent'
import VideoPlayerOptions from './src/VideoPlayerOptions'

export default class VideoPlayer extends BaseWidget {
  constructor() {
    super({
      name: 'Video Player',
      version: '0.1',
      icon: 'film',
      defaultData: {
        loop: true,
        autoplay: true,
        muted: true
      }
    })
  }

  get Widget() {
    return VideoPlayerContent
  }

  get Options() {
    return VideoPlayerOptions
  }
}
