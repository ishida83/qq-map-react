/* global qq */
import React, { Component } from 'react'
import './App.css'
import { QMap, Overlay, HeatMap, MarkerList, Marker, Info, Polygon, utils, config, Circle, ControlPosition, GridHeatmap } from '@tencent/react-tmap'

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
        size: 90,
        width: 92,
        height: 100,
        unit: 'm',
        countField: 'cnt',
        useLocalExtrema: false,
        globalAlpha: 0.7,
        label: {
          show: true,
          fillStyle: '#fff',
          font: '12px Arial'
        }
      }
    }
  }

  componentDidMount () {
    const { polygonPoints } = this.state
    setTimeout(() => {
      this.setState({
        polylineVisible: false,
        radius: 1000,
        strokeDashStyle: 'dash',
        polygonPoints: polygonPoints.map(item => ({
          lat: item.lat + 0.002,
          lng: item.lng + 0.002
        })),
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

    this.map = map
    // this.gridHeatmap = new GridHeatmap(map, heatData, gridOptions)
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

  handleOverlayClick = () => {
    console.log('overlay click')
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
          scaleControl={true}
          scaleControlOptions={{
            position: qq.maps.ControlPosition.BOTTOM_RIGHT
          }}
        >
          <Overlay
            position={{
              lat: 22.54073,
              lng: 113.933571
            }}
            offset={{
              x: 20,
              y: 0
            }}
            style={{
              backgroundColor: 'green'
            }}
          >
            <div className="overlay" onClick={this.handleOverlayClick}>这是自定义 overlay</div>
          </Overlay>
          <Marker
            position={{
              lat: 22.54073,
              lng: 113.933571
            }}
            draggable={true}
            visible
            decoration="10"
            animation={config.ANIMATION_DROP}
            events={{
              click: this.handleMarkerClick
            }}
          />
          {/*  <Marker
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
          <Polygon fillColor={fillColor} visible points={polygonPoints} strokeDashStyle={strokeDashStyle} editable draggable events={{
            adjustNode: e => this.handlePolygonChange(e),
            removeNode: e => this.handlePolygonChange(e),
            insertNode: e => this.handlePolygonChange(e)
          }} />
          <HeatMap heatData={heatMapData} options={heatMapOptions} />
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
