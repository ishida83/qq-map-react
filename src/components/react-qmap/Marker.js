/* global qq */
import React from 'react'
import PropTypes from 'prop-types'
import { ANIMATION_DROP } from './constants'

export default class Marker extends React.Component {
  static defaultProps = {
    position: {},
    animation: ANIMATION_DROP,
    onClick: () => {},
    decorationNum: 1,
    showDecoration: false,
    visible: true
  }

  static propTypes = {
    position: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    animation: PropTypes.oneOf([
      qq.maps.MarkerAnimation.BOUNCE,
      qq.maps.MarkerAnimation.DROP,
      qq.maps.MarkerAnimation.UP,
      qq.maps.MarkerAnimation.DOWN
    ]),
    decorationNum: PropTypes.number,
    onClose: PropTypes.func,
    showDecoration: PropTypes.bool,
    visible: PropTypes.bool
  }

  componentDidMount () {
    this.initMarker()
  }

  componentDidUpdate () {
    this.initMarker()
  }

  initMarker = () => {
    const {
      map,
      position: { lat, lng },
      animation,
      onClick,
      showDecoration,
      decorationNum = 1,
      visible = true
    } = this.props
    if (!map) return
    qq.maps.event.addListenerOnce(map, 'tilesloaded', () => {
      const config = {
        position: new qq.maps.LatLng(lat, lng),
        animation
      }

      if (showDecoration) config.decoration = new qq.maps.MarkerDecoration(decorationNum, new qq.maps.Point(0, -5))
      if (!this.marker) {
        this.marker = new qq.maps.Marker(config)
        qq.maps.event.addListener(this.marker, 'click', () => {
          onClick({
            lat,
            lng
          })
        })
      }

      visible ? this.marker.setMap(map) : this.marker.setMap(null)
    })
  }

  render () {
    return null
  }
}
