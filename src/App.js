import React, { Component } from 'react'
import './App.css'
import { QMap, HeatMap, MarkerList, Info, utils, config } from './components'
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

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showInfo: false,
      center: data[0] || defaultCenter,
      infoPosition: data[0] || defaultCenter,
      polylineVisible: true
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        polylineVisible: false
      })
    }, 5000)
  }

  handleMarkerClick = position => {
    console.log('marker click')
    utils.getAddressByPosition(position).then(result => {
      console.log(result)
      const { detail: { nearPois, address } } = result
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

  render () {
    const { showInfo, center, content, infoPosition } = this.state
    return (
      <div className='App'>
        <QMap
          center={center}
          style={{ height: '800px' }}
          zoom={16}
        >
          <HeatMap heatData={{ data }} options={heatMapOptions} />
          {/* <Marker
            position={center}
            visible
            decoration="1"
            animation={config.ANIMATION_DROP}
            events={{
              click: e => this.handleMarkerClick(center, e)
            }}
          /> */}
          <MarkerList showDecoration animation={config.ANIMATION_DROP} list={data.slice(0, 10)} onClick={this.handleMarkerClick} />
          <Info content={content} visible={showInfo} position={infoPosition} events={{
            close: () => this.handleInfoClose()
          }} />
          {/*
            <MarkerList list={data.slice(0, 10)} onClick={this.handleMarkerClick} />
            <Polyline
              points={data.slice(0, 10)}
              visible={polylineVisible}
              options={{
                editable: true
              }}
            />
          */}
        </QMap>
      </div>
    )
  }
}

export default App
