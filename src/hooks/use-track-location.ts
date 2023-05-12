import { useState } from 'react'

export default function useTrackLocation() {
  const [locationErrorMsg, setLocationErrorMesg] = useState('')
  const [latLong, setLatLong] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  function success(position: { coords: { latitude: number; longitude: number } }) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    setLatLong(`${latitude},${longitude}`)
    setLocationErrorMesg('')
    setIsLoading(false)
  }

  function error() {
    setLocationErrorMesg('unable to retrieve your location')
    setIsLoading(false)
  }
  
  function handleTrackLocation() {
    setIsLoading(true)
    if (!navigator.geolocation) {
      setLocationErrorMesg('Geolocation is not supported by your browser')
      setIsLoading(false)
    } else {
      navigator.geolocation.getCurrentPosition(success, error)
    }
  }
  return {
    latLong,
    handleTrackLocation,
    locationErrorMsg,
    isLoading
  }
}