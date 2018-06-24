/* global qq */
import React from 'react'
import PropTypes from 'prop-types'
import { convertorPointsToPath } from './utils'

export default class Polygon extends React.Component {
  static defaultProps = {
    points: [],
    options: {},
    visible: true,
    editable: true,
    adjustNode: () => {},
    removeNode: () => {},
    insertNode: () => {}
  }

  static propTypes = {
    points: PropTypes.arrayOf(
      PropTypes.shape({
        lat: PropTypes.number,
        lng: PropTypes.number
      })
    ),
    options: PropTypes.object,
    visible: PropTypes.bool
  }

  componentDidMount () {
    this.initPolygon()
  }

  componentDidUpdate () {
    this.initPolygon()
  }

  initPolygon = () => {
    const { points, visible, options, map } = this.props
    const path = convertorPointsToPath(points)
    const _options = {
      ...options,
      path
    }
    if (!map) return
    if (!this.polygon) {
      this.polygon = new qq.maps.Polygon(_options)

      // qq.maps.addEventListener(this.polygon, '')
    }
    this.polygon.setOptions(_options)
    visible ? this.polygon.setMap(map) : this.polygon.setMap(null)
  }
  render () {
    return null
  }
}
