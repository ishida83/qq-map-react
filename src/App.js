import React, { Component } from 'react'
import './App.css'
import { QMap, HeatMap, MarkerList, Info, Polygon, utils, config, Circle } from './components'
import data from './data'

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
      center: data[0] || defaultCenter,
      infoPosition: data[0] || defaultCenter,
      polylineVisible: true,
      polygonPoints: [
        {lat: roundFun(22.53779845431509), lng: roundFun(113.93656424389837)},
        {lat: roundFun(22.540574807809087), lng: roundFun(113.93635769115447)},
        {lat: roundFun(22.542248168090907), lng: roundFun(113.93317359779837)},
        {lat: roundFun(22.540254259833006), lng: roundFun(113.93162700437068)},
        {lat: roundFun(22.538247172738405), lng: roundFun(113.93028937994002)},
        {lat: roundFun(22.53778185230437), lng: roundFun(113.93348019014356)}
      ],
      radius: 100
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        polylineVisible: false,
        radius: 600
      })
    }, 5000)
  }

  handleMarkerClick = position => {
    console.log('marker click')
    utils.getAddressByPosition(position).then(result => {
      console.log(result)
      const {
        detail: { nearPois, address }
      } = result
      this.setState({
        content: `${address}${nearPois[0].name}`,
        showInfo: true,
        infoPosition: position
      })
    })
  }

  handleInfoClose = () => {
    this.setState({
      showInfo: false
    })
  }

  handlePolygonChange = e => {
    console.log('polygon change')
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

  render () {
    const { showInfo, center, content, infoPosition, polygonPoints, radius } = this.state
    return (
      <div className="App">
        <QMap center={center} style={{ height: '800px' }} zoom={16}>
          <HeatMap heatData={{ data }} options={heatMapOptions} />
          {/*
          <Marker
            position={center}
            visible
            decoration="1"
            animation={config.ANIMATION_DROP}
            events={{
              click: e => this.handleMarkerClick(center, e)
            }}
          />
          */}
          <MarkerList showDecoration animation={config.ANIMATION_DROP} list={data.slice(0, 10)} onClick={this.handleMarkerClick} visible={false} />
          <Info content={content} visible={showInfo} position={infoPosition} events={{
            closeclick: () => this.handleInfoClose()
          }} />
          <Polygon visible points={polygonPoints} editable draggable events={{
            adjustNode: e => this.handlePolygonChange(e),
            removeNode: e => this.handlePolygonChange(e),
            insertNode: e => this.handlePolygonChange(e)
          }} />
          <Circle center={center} radius={radius} strokeColor="#666" strokeDashStyle="dash" strokeWeight={2}/>
        </QMap>
      </div>
    )
  }
}

export default App
