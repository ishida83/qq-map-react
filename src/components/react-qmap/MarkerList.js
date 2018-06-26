import React from 'react'
import PropTypes from 'prop-types'
import Marker from './Marker'
import { ANIMATION_DROP } from './constants'

export default class MarkerList extends React.Component {
  static defaultProps = {
    data: [],
    animation: ANIMATION_DROP,
    showDecoration: true
  }

  static propTypes = {
    data: PropTypes.arrayOf(
      PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
      })
    )
  }

  constructor (props) {
    super(props)
    this.markers = []
  }

  componentDidMount () {
    this.initialize()
  }

  initialize = () => {
    const { data, showDecoration, ...rest } = this.props
    this.clearMarkers()

    data.map((m, i) => {
      const decoration = showDecoration ? (m.decoration ? m.decoration : i) : null
      this.markers.push(new Marker({
        ...rest,
        decoration
      }))
    })
  }

  componentWillUnmount () {
    this.clearMarkers()
  }

  clearMarkers = () => {
    this.markers.map(marker => {
      marker.setMap(null)
    })
    this.markers = []
  }

  render () {
    return null
  }
}
