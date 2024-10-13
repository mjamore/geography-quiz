import React from 'react';
import { northAmericaMap } from '../../svg-definitions/north-america'

interface ContinentMapProps {
  continent: string
  countries: string[]
  onCountryClick: (country: string) => void
  highlightedCountries: Record<string, string>
}

const ContinentMap: React.FC<ContinentMapProps> = ({
  countries,
  onCountryClick,
  highlightedCountries,
}) => {
  const getCountryColor = (country: string) => {
    if (highlightedCountries[country] === 'green') return 'fill-green-500'
    if (highlightedCountries[country] === 'red') return 'fill-red-500'
    if (countries.includes(country)) return 'fill-blue-200 hover:fill-blue-300'
    return 'fill-gray-300'
  }

  return (
    <svg viewBox="0 0 600 600" className="w-full h-full max-w-2xl">
      {Object.entries(northAmericaMap).map(([country, path]) => (
        <path
          key={country}
          d={path}
          className={`stroke-gray-800 outline-none ${getCountryColor(country)}`}
          onClick={() => countries.includes(country) && onCountryClick(country)}
          role="button"
          aria-label={country}
          tabIndex={countries.includes(country) ? 0 : -1}
        />
      ))}
    </svg>
  )
}

export default ContinentMap