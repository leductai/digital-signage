import BaseWidget from '../base_widget'
import ClockContent from './src/ClockContent'
import ClockOptions from './src/ClockOptions'

export default class Clock extends BaseWidget {
  constructor() {
    super({
      name: 'Clock',
      version: '0.1',
      icon: 'clock',
      defaultData: {
        format: '24hour',
        color: '#ffffff',
        backgroundColor: '#000000',
        showSeconds: true
      }
    })
  }

  get Widget() {
    return ClockContent
  }

  get Options() {
    return ClockOptions
  }
}

