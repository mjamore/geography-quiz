import React from 'react';
import { northAmericaMap } from '../../svg-definitions/north-america';
import { southAmericaMap } from '../../svg-definitions/south-america';
import { asiaMap } from '../../svg-definitions/asia';
import { africaMap } from '../../svg-definitions/africa';
import { europeMap } from '../../svg-definitions/europe';
import { oceaniaMap } from '../../svg-definitions/oceania';

interface ContinentMapProps {
  continent: string
  countries: string[]
  onCountryClick: (country: string) => void
  highlightedCountries: Record<string, string>
}

const ContinentMap: React.FC<ContinentMapProps> = ({
  continent,
  countries,
  onCountryClick,
  highlightedCountries,
}) => {
  let continentMap: Record<string, string> = {};
  // create a switch statement to return the correct continent map
  switch (continent) {
    case 'north-america':
      continentMap = northAmericaMap;
      break;
    case 'south-america':
      continentMap = southAmericaMap;
      break;
    case 'europe':
      continentMap = europeMap;
      break;
    case 'africa':
      continentMap = africaMap;
      break;
    case 'asia':
      continentMap = asiaMap;
      break;
    case 'oceania':
      continentMap = oceaniaMap;
      break;
    default:
      break;
  }
  const getCountryColor = (country: string) => {
    if (highlightedCountries[country] === 'green') return 'fill-green-500';
    if (highlightedCountries[country] === 'red') return 'fill-red-500';
    if (countries.includes(country)) return 'fill-blue-200 hover:fill-blue-300';
    return 'fill-gray-300';
  };

  return (
    <svg className="w-full h-full max-w-2xl" viewBox="0 0 600 600">
      {Object.entries(continentMap).map(([country, path]) => (
        <path
          aria-label={country}
          className={`stroke-gray-800 outline-none ${getCountryColor(country)}`}
          d={path}
          key={country}
          role="button"
          tabIndex={countries.includes(country) ? 0 : -1}
          onClick={() => countries.includes(country) && onCountryClick(country)}
        />
      ))}
    </svg>
  );
};

export default ContinentMap;
