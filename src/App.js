/* global qq */
import React, { Component } from 'react'
import './App.css'
import { QMap, HeatMap, MarkerList, Marker, Info, Polygon, utils, config, Circle, ControlPosition, GridHeatmap } from 'qmap'

import heatData from './data'
import CustomerControl from './CustomControl'

const generalRadius = (source, r = 4) => {
  return source.map(curData => {
    const radius = curData.cnt / source[0].cnt * r
    return {
      ...curData,
      radius: radius < 1 ? 1 : radius
    }
  })
}

const heatMapOptions = {
  radius: 1,
  maxOpacity: 0.8,
  useLocalExtrema: true,
  valueField: 'cnt'
}

// 默认首都
const defaultCenter = {
  lat: 39.921984,
  lng: 116.418261
}

const roundFun = (value, n = 5) => {
  return parseFloat(value.toFixed(n))
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showInfo: false,
      center: heatData[0] || defaultCenter,
      infoPosition: heatData[0] || defaultCenter,
      polylineVisible: true,
      strokeDashStyle: 'solid',
      fillColor: new qq.maps.Color(0, 110, 255, 0.2),
      polygonPoints: [
        {lat: roundFun(22.53779845431509), lng: roundFun(113.93656424389837)},
        {lat: roundFun(22.540574807809087), lng: roundFun(113.93635769115447)},
        {lat: roundFun(22.542248168090907), lng: roundFun(113.93317359779837)},
        {lat: roundFun(22.540254259833006), lng: roundFun(113.93162700437068)},
        {lat: roundFun(22.538247172738405), lng: roundFun(113.93028937994002)},
        {lat: roundFun(22.53778185230437), lng: roundFun(113.93348019014356)}
      ],
      heatMapData: {
        max: 100,
        data: []
      },
      heatData: heatData,
      radius: 100,
      zoom: 16,
      gridOptions: {
        zIndex: 2,
        fillStyle: 'rgba(55, 50, 250, 1)',
        shadowColor: 'rgba(255, 250, 50, 0.3)',
        shadowBlur: 20,
        size: 100,
        width: 93,
        height: 101,
        unit: 'm',
        globalAlpha: 0.8,
        label: {
          show: true,
          fillStyle: 'white',
          shadowColor: 'white',
          font: '12px Arial',
          shadowBlur: 10
        },
        gradient: {
          0.16: '#ADD7FF',
          0.32: '#87C1FF',
          0.48: '#60A8FF',
          0.64: '#338BFF',
          0.78: '#0752C9',
          1.0: '#0E3CA1'
        },
        draw: 'grid'
      }
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        polylineVisible: false,
        radius: 1000,
        strokeDashStyle: 'dash',
        heatMapData: {
          max: 100,
          data: generalRadius(heatData)
        }
      })
    }, 3000)
  }

  handleMarkerClick = marker => {
    const { position } = marker
    utils.getAddressByLatLng(position).then(result => {
      const {
        detail: { nearPois, address }
      } = result
      this.setState({
        content: `${address}${nearPois[0].name}`,
        showInfo: true,
        infoPosition: {...position}
      })
    })
  }

  handleInfoClose = () => {
    this.setState({
      showInfo: false
    })
  }

  handlePolygonChange = e => {
    const { path: { elems } } = e
    if (elems && elems.length) {
      this.setState({
        polygonPoints: e.path.elems.map(el => ({
          lat: roundFun(el.lat),
          lng: roundFun(el.lng)
        }))
      })
    }
  }

  handleRadiusChange = (radius, circle) => {
    const { map } = this.state
    if (map) {
      map.fitBounds(circle.getBounds())
    }
  }

  handleMapIdle = map => {
    console.log('map idle')
    const { gridOptions } = this.state
    const dataSet = heatData.map((point, i) => ({
      geometry: {
        type: 'Point',
        coordinates: [parseFloat(point.lng.toFixed(4)), parseFloat(point.lat.toFixed(4))]
      },
      count: heatData[i].cnt
    }))

    const max = Math.max(...heatData.map(item => item.cnt))
    this.map = map
    gridOptions.max = max
    this.gridHeatmap = new GridHeatmap(map, dataSet, gridOptions)
  }

  handleChange = val => {
    console.log(val)
  }

  handleEdit = () => {
    window.alert('编辑')
  }

  handleChoose = () => {
    window.alert('选择')
  }

  render () {
    const { showInfo, center, content, infoPosition, polygonPoints, radius, zoom, strokeDashStyle, heatMapData, fillColor, gridOptions } = this.state
    const markerPosition = {
      ...center,
      lng: center.lng + 0.008
    }

    return (
      <div className="App">
        <QMap
          center={{
            lat: 22.54073,
            lng: 113.933571
          }}
          style={{ height: '1000px' }}
          zoom={zoom}
          events={{
            idle: this.handleMapIdle
          }}
        >
          <Marker
            position={heatData[0]}
            draggable={true}
            visible
            decoration="10"
            animation={config.ANIMATION_DROP}
            events={{
              click: this.handleMarkerClick
            }}
          />
          <MarkerList showDecoration animation={config.ANIMATION_DROP} data={heatData.slice(0, 10)} events={{
            click: this.handleMarkerClick
          }} visible={true} />
          <Info content={content} visible={showInfo} position={infoPosition} events={{
            closeclick: () => this.handleInfoClose()
          }} />
          {/* <HeatMap heatData={heatMapData} options={heatMapOptions} />
          <Polygon fillColor={fillColor} visible points={polygonPoints} strokeDashStyle={strokeDashStyle} editable draggable events={{
            adjustNode: e => this.handlePolygonChange(e),
            removeNode: e => this.handlePolygonChange(e),
            insertNode: e => this.handlePolygonChange(e)
          }} />
          <Circle center={center} radius={radius} strokeColor="#666" strokeDashStyle="dash" strokeWeight={2} events={{
            radius_changed: (circle, e) => this.handleRadiusChange(radius, circle, e)
          }} />
          <CustomerControl
            position={ControlPosition.RIGHT_CENTER}
            style={{
              zIndex: 999
            }}
            onEdit={this.handleEdit}
            onChoose={this.handleChoose}
          /> */}
        </QMap>
      </div>
    )
  }
}

export default App
