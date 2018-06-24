import React from 'react'
import PropTypes from 'prop-types'
import Marker from './Marker'

export default class MarkerList extends React.Component {
  static defaultProps = {
    list: [],
    onClick: () => {},
    showDecoration: true
  }

  static propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
      })
    ),
    onClose: PropTypes.func
  }

  render () {
    const { list, map, onClick, showDecoration = true } = this.props
    if (!map) return null
    return list.map((item, i) => {
      return (
        <Marker
          key={i}
          showDecoration={showDecoration}
          decorationNum={i + 1}
          position={item}
          map={map}
          onClick={position => onClick(position, i)}
        />
      )
    })
  }
}
