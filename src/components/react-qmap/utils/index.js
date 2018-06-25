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

export {
  getAddressByLatLng,
  convertorPointsToPath,
  getAddressByPosition,
  pointToLatLng
}
