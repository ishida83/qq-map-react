/* global qq */
import React from 'react'
import PropTypes from 'prop-types'
import _extend from 'extend'

const defaultCenter = {
  lat: 39.921984,
  lng: 116.418261
}

class Map extends React.Component {
  static propTypes = {
    position: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
      })
    ]),
    style: PropTypes.object,
    mapOptions: PropTypes.object,
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    center: PropTypes.any
  }

  static defaultProps = {
    position: defaultCenter,
    mapOptions: {},
    style: {
      height: '600px'
    },
    center: new qq.maps.LatLng(defaultCenter.lat, defaultCenter.lng)
  }

  constructor (props) {
    super(props)
    this.state = {
      mapOptions: {
        zoom: 14,
        mapTypeControl: false,
        scaleControl: true
      }
    }
  }

  get options () {
    const { position: { lat, lng }, mapOptions, center } = this.props
    const { mapOptions: options } = this.state
    const _options = _extend(true, {}, options, mapOptions)
    if (lat && lng) {
      _options.center = new qq.maps.LatLng(lat, lng)
    } else {
      _options.center = center
    }
    return _options
  }

  componentDidMount () {
    this.initMap()
    this.forceUpdate()
  }

  componentDidUpdate () {}

  componentWillUnmount () {}

  initMap = () => {
    this.map = new qq.maps.Map(this.mapNode, this.options)
  }

  render () {
    const { style } = this.props
    return (
      <div className='qmap-container'>
        <div ref={node => (this.mapNode = node)} className={this.props.className} style={style}>
          加载地图中...
        </div>
      </div>
    )
  }
}

export default Map
