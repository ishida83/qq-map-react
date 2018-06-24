/* global qq */
import React from 'react'
import PropTypes from 'prop-types'

export default class Info extends React.Component {
  static defaultProps = {
    visible: false,
    position: {},
    content: '测试',
    onClose: () => {}
  }

  static propTypes = {
    visible: PropTypes.bool,
    position: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    content: PropTypes.string,
    onClose: PropTypes.func
  }

  componentDidMount () {
    this.initInfo()
  }

  componentDidUpdate () {
    this.initInfo()
  }

  initInfo = () => {
    const { map, visible, position: { lat, lng }, content, onClose } = this.props
    const latLng = new qq.maps.LatLng(lat, lng)
    if (!map) return
    if (!this.info) {
      this.info = new qq.maps.InfoWindow({
        map: map
      })

      qq.maps.event.addListener(this.info, 'closeclick', onClose)
    }
    let infoContent = `<div style="width: 100%;max-width: 300px;text-align:left;">${content}</div>`
    this.info.setPosition(latLng)
    this.info.setContent(infoContent)
    visible ? this.info.open() : this.info.close()
  }

  render () {
    return null
  }
}
