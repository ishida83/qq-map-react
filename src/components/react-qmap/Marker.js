/* global qq */
import React from 'react'
import PropTypes from 'prop-types'
import { ANIMATION_DROP } from './constants'

export default class Marker extends React.Component {
  static defaultProps = {
    position: {},
    animation: ANIMATION_DROP,
    onClick: () => {}
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
    onClose: PropTypes.func
  }

  componentDidMount () {
    this.initMarker()
  }

  componentDidUpdate () {
    this.initMarker()
  }

  initMarker = () => {
    const { map, position: { lat, lng }, animation, onClick } = this.props
    if (!map) return
    if (!this.marker) {
      qq.maps.event.addListenerOnce(map, 'tilesloaded', () => {
        this.marker = new qq.maps.Marker({
          position: new qq.maps.LatLng(lat, lng),
          animation,
          map
        })

        qq.maps.event.addListener(this.marker, 'click', () => {
          onClick({
            lat,
            lng
          })
        })
      })
    }
  }

  render () {
    return null
  }
}
