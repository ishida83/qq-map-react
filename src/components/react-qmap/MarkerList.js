import React from 'react'
import Marker from './Marker'

export default class MarkerList extends React.Component {
  static defaultProps = {
    list: [],
    value: {},
    onClick: () => {}
  }
  render () {
    const { list, map, onClick } = this.props
    if (!map) return null
    return list.map((item, i) => {
      return <Marker key={i} position={item} map={map} onClick={position => onClick(position, i)} />
    })
  }
}
