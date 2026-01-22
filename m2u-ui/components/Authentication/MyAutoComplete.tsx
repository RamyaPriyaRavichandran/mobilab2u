'use client'

import type React from 'react'
import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'
import Image from 'next/image'

declare global {
  interface Window {
    google: typeof google
  }
  // eslint-disable-next-line no-var
  var google: any
}

const loader = new Loader({
  apiKey: 'AIzaSyBujQEhwdb_S5_oMKTOWCNPIGD-AlxsPWk',
  version: 'weekly',
  libraries: ['places'],
})

interface MyAutocompleteProps {
  setFieldValue: (field: string, value: any) => void
  fieldPrefix?: string // e.g., "customerAddress" or "members.0.address"
  placeholder?: string
}

const MyAutocomplete = ({ setFieldValue, fieldPrefix = '', placeholder = 'Enter a location' }: MyAutocompleteProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [inputValue, setInputValue] = useState('')
  const [error, setError] = useState<string>('')

  useEffect(() => {
    loader.load().then((google) => {
      if (inputRef.current) {
        const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
          componentRestrictions: { country: 'MY' },
          fields: ['address_components', 'formatted_address', 'geometry'],
        })

        autocomplete.addListener('place_changed', () => handlePlaceSelect(autocomplete))
      }
    })
  }, [])

  const handlePlaceSelect = async (autocomplete: any) => {
    const place = autocomplete.getPlace()
    if (!place.geometry) return

    const formattedAddress = place.formatted_address || ''

    const lat = place.geometry.location.lat()
    const lng = place.geometry.location.lng()

    const city =
      place.address_components?.find(
        (comp: any) => comp.types.includes('locality') || comp.types.includes('administrative_area_level_2')
      )?.long_name || ''

    const state =
      place.address_components?.find((comp: any) => comp.types.includes('administrative_area_level_1'))?.long_name || ''

    let pincode = place.address_components?.find((comp: any) => comp.types.includes('postal_code'))?.long_name || ''

    // fallback if postal_code is missing
    if (!pincode && place.geometry) {
      const geocoder = new google.maps.Geocoder()
      const { lat, lng } = place.geometry.location

      const result = await new Promise<any>((resolve, reject) => {
        geocoder.geocode({ location: { lat: lat(), lng: lng() } }, (results: any, status: any) => {
          if (status === 'OK' && results[0]) resolve(results[0])
          else reject('Geocoder failed')
        })
      })

      pincode = result.address_components?.find((comp: any) => comp.types.includes('postal_code'))?.long_name || ''
    }

    const buildFieldPath = (fieldName: string) => (fieldPrefix ? `${fieldPrefix}.${fieldName}` : fieldName)

    setFieldValue(buildFieldPath('city'), city)
    setFieldValue(buildFieldPath('state'), state)
    setFieldValue(buildFieldPath('postCode'), pincode)
    setFieldValue(buildFieldPath('lat'), lat)
    setFieldValue(buildFieldPath('lng'), lng)
    setInputValue(formattedAddress)

    setTimeout(() => {
      inputRef.current?.blur()
    }, 100)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.')
      return
    }

    navigator.geolocation.getCurrentPosition(geoSuccess, () => setError('Unable to retrieve your location.'))
  }

  const geoSuccess = async (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords
    const geocoder = new google.maps.Geocoder()

    try {
      const result = await new Promise<any>((resolve, reject) => {
        geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results: any, status: any) => {
          if (status === 'OK' && results[0]) resolve(results[0])
          else reject('Geocoder failed')
        })
      })

      const formattedAddress = result.formatted_address || ''

      const city =
        result.address_components?.find(
          (comp: any) => comp.types.includes('locality') || comp.types.includes('administrative_area_level_2')
        )?.long_name || ''

      const state =
        result.address_components?.find((comp: any) => comp.types.includes('administrative_area_level_1'))?.long_name ||
        ''

      const pincode =
        result.address_components?.find((comp: any) => comp.types.includes('postal_code'))?.long_name || ''
      const location = result.address_components.find((com: any) => com.types.includes(''))
      const buildFieldPath = (fieldName: string) => {
        return fieldPrefix ? `${fieldPrefix}.${fieldName}` : fieldName
      }

      setFieldValue(buildFieldPath('city'), city)
      setFieldValue(buildFieldPath('state'), state)
      setFieldValue(buildFieldPath('postCode'), pincode)
      setFieldValue(buildFieldPath('lat'), latitude)
      setFieldValue(buildFieldPath('lng'), longitude)
      setInputValue(formattedAddress)

      setTimeout(() => {
        inputRef.current?.blur()
      }, 100)
    } catch {
      setError('Unable to retrieve address. Please try again later.')
    }
  }

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        className="w-full py-2 px-3 text-sm text-gray-700 placeholder-gray-400 
            border-2 border-gray-300 rounded-md focus:ring-0
            focus:border-brand-700 "
        placeholder={placeholder}
        value={inputValue}
        onChange={handleInputChange}
      />

      <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={getLocation}>
        <Image src="/images/locations.png" unoptimized width={30} height={30} alt="Search" />
      </span>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default MyAutocomplete
