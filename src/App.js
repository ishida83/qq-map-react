import React, { Component } from 'react'
import './App.css'
import { QMap, HeatMap, MarkerList, Info, utils, Polyline } from './components'
import data from './data'

const heatMapOptions = {
  radius: 1,
  maxOpacity: 0.8,
  useLocalExtrema: true,
  valueField: 'cnt'
}

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showInfo: false,
      center: data[0],
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
    console.log(position)
    utils.getAddressByLatLng(position).then(result => {
      console.log(result)
      const { detail: { nearPois, address } } = result
      this.setState({
        content: `${address}${nearPois[0].name}`,
        showInfo: true,
        center: position
      })
    })
  }

  handleInfoClose = () => {
    this.setState({
      showInfo: false
    })
  }

  render () {
    const { showInfo, center, content, polylineVisible } = this.state
    return (
      <div className='App'>
        <QMap position={center} style={{ height: '800px' }}>
          <HeatMap heatData={{ data }} options={heatMapOptions} />
          <MarkerList list={data.slice(0, 10)} onClick={this.handleMarkerClick} />
          <Info onClose={this.handleInfoClose} content={content} visible={showInfo} position={center} />
          <Polyline
            points={data.slice(0, 10)}
            visible={polylineVisible}
            options={{
              editable: true
            }}
          />
        </QMap>
      </div>
    )
  }
}

export default App
