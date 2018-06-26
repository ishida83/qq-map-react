/* global qq */
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'
import { pointToLatLng } from './utils'

export default class Circle extends BaseComponent {
  static defaultProps = {
    center: {},
    radius: 10,
    visible: true
  }

  static propTypes = {
    center: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }).isRequired,
    radius: PropTypes.number.isRequired
  }

  get events () {
    return [
      'center_changed',
      'map_changed',
      'radius_changed',
      'visible_changed',
      'zindex_changed',
      'click',
      'dblclick',
      'rightclick',
      'mousedown',
      'mouseup',
      'mouseover',
      'mouseout',
      'mousemove'
    ]
  }

  get options () {
    return [
      'center',
      'clickable',
      'cursor',
      'fillColor',
      'map',
      'radius',
      'strokeColor',
      'strokeDashStyle',
      'strokeWeight',
      'visible',
      'zIndex'
    ]
  }

  componentDidMount () {
    this.initCircle()
  }

  componentDidUpdate (prevProps) {
    this.initCircle()
  }

  initCircle = () => {
    const { center, map, visible } = this.props
    const options = this.getOptions(this.options)
    options.center = pointToLatLng(center)
    if (!map) return
    if (!this.circle) {
      this.circle = new qq.maps.Circle(options)
    }

    this.circle.setOptions(options)

    visible ? this.circle.setMap(map) : this.circle.setMap(null)
  }

  render () {
    return null
  }
}
