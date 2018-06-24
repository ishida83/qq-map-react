import React from 'react'
import PropTypes from 'prop-types'
import Marker from './Marker'

export default class MarkerList extends React.Component {
  static defaultProps = {
    list: [],
    onClick: () => {}
  }

  static propTypes = {
    list: PropTypes.arrayOf(PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    })),
    onClose: PropTypes.func
  }

  render () {
    const { list, map, onClick } = this.props
    if (!map) return null
    return list.map((item, i) => {
      return <Marker key={i} position={item} map={map} onClick={position => onClick(position, i)} />
    })
  }
}
