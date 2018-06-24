/* global qq */
import BaseComponent from './BaseComponent'

export default class Marker extends BaseComponent {
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

  initMarker = () => {
    const { map } = this.props
    if (!map) return
    const options = this.getOptions(this.options)
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
