/* global qq */
import BaseComponent from './BaseComponent'
import PropTypes from 'prop-types'
import { pointToLatLng } from './utils'

export default class Marker extends BaseComponent {
  static defaultProps = {
    decoration: '',
    visible: true
  }

  static propTypes = {
    position: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })
  }

  get events () {
    return [
      'animation_changed',
      'clickable_changed',
      'cursor_changed',
      'draggable_changed',
      'flat_changed',
      'icon_changed',
      'map_changed',
      'position_changed',
      'shadow_changed',
      'shape_changed',
      'title_changed',
      'visible_changed',
      'zindex_changed',
      'click',
      'mousedown',
      'mouseup',
      'mouseover',
      'mouseout',
      'dblclick',
      'rightclick',
      'dragstart',
      'dragging',
      'dragend',
      'moving',
      'moveend'
    ]
  }

  get options () {
    return [
      'animation',
      'clickable',
      'draggable',
      'flat',
      'cursor',
      'icon',
      'shadow',
      'shape',
      'title',
      'visible',
      'zIndex',
      'map',
      'position',
      'rotation',
      'autoRotation'
    ]
  }

  componentDidMount () {
    this.initMarker()
  }

  componentDidUpdate () {
    this.initMarker()
  }

  componentWillUnmount () {
    this.marker.setMap(null)
    this.marker = null
  }

  initMarker = () => {
    const { map, decoration } = this.props
    if (!map) return
    const options = this.getOptions(this.options)
    options.position = pointToLatLng(options.position)
    if (decoration) {
      options.decoration = new qq.maps.MarkerDecoration(decoration, new qq.maps.Point(0, -5))
    }
    qq.maps.event.addListenerOnce(map, 'tilesloaded', () => {
      if (!this.marker) {
        this.marker = new qq.maps.Marker(options)
        this.bindEvent(this.marker, this.events)
      }

      options.visible ? this.marker.setMap(map) : this.marker.setMap(null)
    })
  }

  render () {
    return null
  }
}
