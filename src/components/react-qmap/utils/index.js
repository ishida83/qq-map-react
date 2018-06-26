/* global qq */
const getAddressByPosition = ({ lat, lng }) => {
  return getAddressByLatLng(pointToLatLng({lat, lng}))
}

const getAddressByLatLng = latLng => {
  return new Promise(resolve => {
    const geocoder = new qq.maps.Geocoder({
      complete: result => resolve(result)
    })

    geocoder.getAddress(latLng)
  })
}

const convertorPointsToPath = points => {
  return points.map(position => {
    return pointToLatLng(position)
  })
}

const pointToLatLng = ({ lat, lng }) => {
  return new qq.maps.LatLng(lat, lng)
}

// 简单的首字母大写
const toPascal = str => {
  if (!str || str.length === 0) return ''
  return `${str[0].toUpperCase()}${str.substr(1)}`
}

export {
  getAddressByLatLng,
  convertorPointsToPath,
  getAddressByPosition,
  pointToLatLng,
  toPascal
}
