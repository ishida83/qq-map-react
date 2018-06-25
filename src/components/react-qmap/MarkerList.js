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
    )
  }

  render () {
    const { list, map, onClick, showDecoration = true } = this.props
    if (!map) return null
    return list.map((item, i) => {
      return (
        <Marker
          key={i}
          decoration={showDecoration ? (i + 1) : null}
          position={item}
          map={map}
          events={{
            click: () => onClick(item, i)
          }}
        />
      )
    })
  }
}
