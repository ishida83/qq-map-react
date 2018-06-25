/* global qq */
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'
import { convertorPointsToPath } from './utils'

export default class Polygon extends BaseComponent {
  static defaultProps = {
    points: []
  }

  static propTypes = {
    points: PropTypes.arrayOf(
      PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
      })
    ),
    visible: PropTypes.bool
  }

  get events () {
    return [
      'map_changed',
      'visible_changed',
      'zindex_changed',
      'click',
      'dblclick',
      'rightclick',
      'mousedown',
      'mouseup',
      'mouseover',
      'mouseout',
      'mousemove',
      'insertNode',
      'removeNode',
      'adjustNode'
    ]
  }

  get options () {
    return [
      'clickable',
      'cursor',
      'editable',
      'fillColor',
      'map',
      'path',
      'strokeColor',
      'strokeDashStyle',
      'strokeWeight',
      'visible',
      'zIndex',
      'draggable'
    ]
  }

  componentDidMount () {
    this.initPolygon()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.points !== this.props.points) {
      const path = convertorPointsToPath(this.props.points)
      this.polygon.setPath(path)
    }
  }

  initPolygon = () => {
    const { points, visible, map } = this.props
    const path = convertorPointsToPath(points)
    const options = this.getOptions(this.options)
    options.path = path
    if (!map) return
    if (!this.polygon) {
      this.polygon = new qq.maps.Polygon(options)
      this.bindEvent(this.polygon, this.events)
    }
    this.polygon.setOptions(options)
    visible ? this.polygon.setMap(map) : this.polygon.setMap(null)
  }
  render () {
    return null
  }
}
