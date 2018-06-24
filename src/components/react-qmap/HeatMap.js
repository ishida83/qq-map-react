/* global qq, QQMapPlugin */
import React from 'react'

export default class HeatMap extends React.Component {
  static defaultProps = {
    options: {
      radius: 1,
      maxOpacity: 0.8,
      useLocalExtrema: true,
      valueField: 'count'
    },
    heatData: {
      max: 100,
      data: []
    },
    map: undefined
  }

  componentDidMount () {
    this.initHeatMap()
  }

  componentDidUpdate () {
    this.initHeatMap()
  }

  initHeatMap = () => {
    const { options, heatData, map } = this.props
    if (!map) return
    qq.maps.event.addListenerOnce(map, 'idle', () => {
      this.heatMap = new QQMapPlugin.HeatmapOverlay(map, options)
      this.heatMap.setData(heatData)
    })
  }

  render () {
    return null
  }
}
