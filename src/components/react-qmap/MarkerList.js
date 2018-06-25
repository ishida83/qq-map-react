import React from 'react'
import PropTypes from 'prop-types'
import Marker from './Marker'
import { ANIMATION_DROP } from './constants'

export default class MarkerList extends React.Component {
  static defaultProps = {
    list: [],
    onClick: () => {},
    animation: ANIMATION_DROP,
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
    const { list, map, onClick, showDecoration = true, animation } = this.props
    if (!map) return null
    return list.map((item, i) => {
      return (
        <Marker
          key={i}
          decoration={showDecoration ? (i + 1) : null}
          position={item}
          animation={animation}
          map={map}
          events={{
            click: () => onClick(item, i)
          }}
        />
      )
    })
  }
}
