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
  let viewBox = '-100 0 950 770';
  let scale = '1.7';

  // create a switch statement to return the correct continent map
  switch (continent) {
    case 'north-america':
      continentMap = northAmericaMap;
      break;
    case 'south-america':
      continentMap = southAmericaMap;
      viewBox = '500 1450 950 790';
      scale = '3.4';
      break;
    case 'europe':
      continentMap = europeMap;
      viewBox = '-100 0 950 770';
      scale = '1.0';
      break;
    case 'africa':
      continentMap = africaMap;
      viewBox = '1300 1220 950 770';
      scale = '3.5';
      break;
    case 'asia':
      continentMap = asiaMap;
      viewBox = '850 80 950 770';
      scale = '1.7';
      break;
    case 'oceania':
      continentMap = oceaniaMap;
      viewBox = '2150 1200 950 770';
      scale = '3';
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
    <div className='w-[950px] h-[790px]'>
      <svg preserveAspectRatio="xMidYMid meet" viewBox={viewBox}>
        <g transform={`scale(${scale})`}>
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
        </g>
      </svg>
    </div>
  );
};

export default ContinentMap;
