/* global qq */
const getAddressByLatLng = ({ lat, lng }) => {
  return new Promise(resolve => {
    const geocoder = new qq.maps.Geocoder({
      complete: result => resolve(result)
    })

    geocoder.getAddress(new qq.maps.LatLng(lat, lng))
  })
}

export {
  getAddressByLatLng
}
