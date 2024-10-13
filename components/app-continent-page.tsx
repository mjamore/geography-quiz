'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'
import { Button } from "@/components/ui/button"

const ContinentMap = ({ continent, countries, onCountryClick, highlightedCountries }) => {
  const continentSVGs = {
    'north-america': (
      <svg viewBox="0 0 1000 1000" className="w-full h-full">
        <path d="M200,100 L300,50 L700,150 L800,400 L750,600 L500,800 L300,750 L200,600 Z" fill="none" stroke="black" />
        {/* Add more paths for individual countries */}
      </svg>
    ),
    'south-america': (
      <svg viewBox="0 0 1000 1000" className="w-full h-full">
        <path d="M300,100 L700,200 L800,600 L600,900 L400,800 L200,500 Z" fill="none" stroke="black" />
        {/* Add more paths for individual countries */}
      </svg>
    ),
    'europe': (
      <svg viewBox="0 0 1000 1000" className="w-full h-full">
        <path d="M200,200 L800,100 L900,400 L700,700 L300,600 L100,400 Z" fill="none" stroke="black" />
        {/* Add more paths for individual countries */}
      </svg>
    ),
    'africa': (
      <svg viewBox="0 0 1000 1000" className="w-full h-full">
        <path d="M300,100 L700,200 L800,600 L500,900 L200,700 L100,400 Z" fill="none" stroke="black" />
        {/* Add more paths for individual countries */}
      </svg>
    ),
    'asia': (
      <svg viewBox="0 0 1000 1000" className="w-full h-full">
        <path d="M100,200 L900,100 L950,500 L700,900 L300,800 L200,500 Z" fill="none" stroke="black" />
        {/* Add more paths for individual countries */}
      </svg>
    ),
    'oceania': (
      <svg viewBox="0 0 1000 1000" className="w-full h-full">
        <path d="M300,300 L700,200 L800,500 L600,800 L400,700 Z" fill="none" stroke="black" />
        {/* Add more paths for individual countries */}
      </svg>
    ),
  }

  return (
    <div className="w-full h-96 bg-gray-100 relative border border-gray-300 rounded-lg overflow-hidden">
      {continentSVGs[continent]}
    </div>
  )
}

const continentData = {
  'north-america': ['United States', 'Canada', 'Mexico', 'Guatemala', 'Cuba', 'Haiti', 'Dominican Republic', 'Honduras', 'Nicaragua', 'El Salvador', 'Costa Rica', 'Panama', 'Jamaica', 'Trinidad and Tobago', 'Belize'],
  'south-america': ['Brazil', 'Argentina', 'Colombia', 'Peru', 'Venezuela', 'Chile', 'Ecuador', 'Bolivia', 'Paraguay', 'Uruguay', 'Guyana', 'Suriname', 'French Guiana'],
  'europe': ['Russia', 'Germany', 'United Kingdom', 'France', 'Italy', 'Spain', 'Ukraine', 'Poland', 'Romania', 'Netherlands', 'Belgium', 'Greece', 'Czech Republic', 'Portugal', 'Sweden', 'Hungary', 'Belarus', 'Austria', 'Switzerland', 'Bulgaria', 'Denmark', 'Finland', 'Slovakia', 'Norway', 'Ireland', 'Croatia', 'Moldova', 'Bosnia and Herzegovina', 'Albania', 'Lithuania', 'North Macedonia', 'Slovenia', 'Latvia', 'Estonia', 'Montenegro', 'Luxembourg', 'Malta', 'Iceland', 'Andorra', 'Monaco', 'Liechtenstein', 'San Marino', 'Vatican City'],
  'africa': ['Nigeria', 'Ethiopia', 'Egypt', 'Democratic Republic of the Congo', 'Tanzania', 'South Africa', 'Kenya', 'Uganda', 'Algeria', 'Sudan', 'Morocco', 'Angola', 'Mozambique', 'Ghana', 'Madagascar', 'Cameroon', 'Côte d\'Ivoire', 'Niger', 'Burkina Faso', 'Mali', 'Malawi', 'Zambia', 'Senegal', 'Chad', 'Somalia', 'Zimbabwe', 'Guinea', 'Rwanda', 'Benin', 'Burundi', 'Tunisia', 'South Sudan', 'Togo', 'Sierra Leone', 'Libya', 'Congo', 'Liberia', 'Central African Republic', 'Mauritania', 'Eritrea', 'Namibia', 'Gambia', 'Botswana', 'Gabon', 'Lesotho', 'Guinea-Bissau', 'Equatorial Guinea', 'Mauritius', 'Eswatini', 'Djibouti', 'Comoros', 'Cabo Verde', 'Sao Tome and Principe', 'Seychelles'],
  'asia': ['China', 'India', 'Indonesia', 'Pakistan', 'Bangladesh', 'Japan', 'Philippines', 'Vietnam', 'Turkey', 'Iran', 'Thailand', 'Myanmar', 'South Korea', 'Iraq', 'Afghanistan', 'Saudi Arabia', 'Uzbekistan', 'Malaysia', 'Yemen', 'Nepal', 'North Korea', 'Sri Lanka', 'Kazakhstan', 'Syria', 'Cambodia', 'Jordan', 'Azerbaijan', 'United Arab Emirates', 'Tajikistan', 'Israel', 'Laos', 'Lebanon', 'Kyrgyzstan', 'Turkmenistan', 'Singapore', 'Oman', 'State of Palestine', 'Kuwait', 'Georgia', 'Mongolia', 'Armenia', 'Qatar', 'Bahrain', 'Timor-Leste', 'Cyprus', 'Bhutan', 'Maldives', 'Brunei'],
  'oceania': ['Australia', 'Papua New Guinea', 'New Zealand', 'Fiji', 'Solomon Islands', 'Vanuatu', 'New Caledonia', 'French Polynesia', 'Samoa', 'Guam', 'Kiribati', 'Micronesia', 'Tonga', 'Marshall Islands', 'Northern Mariana Islands', 'Palau', 'Cook Islands', 'Tuvalu', 'Wallis and Futuna', 'Nauru', 'Niue', 'Tokelau'],
}

export function Page() {
  const router = useRouter()
  const { continent } = useParams()
  const [countries, setCountries] = useState([])
  const [currentCountry, setCurrentCountry] = useState('')
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [highlightedCountries, setHighlightedCountries] = useState({})

  useEffect(() => {
    if (!continentData[continent]) {
      router.push('/')
      return
    }
    setCountries(continentData[continent])
  }, [continent, router])

  useEffect(() => {
    if (countries.length > 0) {
      setCurrentCountry(countries[Math.floor(Math.random() * countries.length)])
    } else {
      setGameOver(true)
    }
  }, [countries])

  const handleCountryClick = (clickedCountry) => {
    if (clickedCountry === currentCountry) {
      toast.success('Correct!')
      setScore(score + 1)
      setHighlightedCountries({...highlightedCountries, [clickedCountry]: 'green'})
    } else {
      toast.error('Incorrect!')
      setHighlightedCountries({...highlightedCountries, [currentCountry]: 'red'})
    }

    setCountries(countries.filter(country => country !== currentCountry))

    setTimeout(() => {
      toast.dismiss()
    }, 2000)
  }

  const restartGame = () => {
    setCountries(continentData[continent])
    setScore(0)
    setGameOver(false)
    setHighlightedCountries({})
  }

  if (!continentData[continent]) {
    return null // This will prevent any rendering while redirecting
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 capitalize">{continent.replace('-', ' ')} Quiz</h1>
      {!gameOver ? (
        <>
          <p className="text-2xl mb-4">Find: {currentCountry}</p>
          <p className="text-xl mb-4">Score: {score}/{continentData[continent].length}</p>
          <ContinentMap 
            continent={continent} 
            countries={countries} 
            onCountryClick={handleCountryClick}
            highlightedCountries={highlightedCountries}
          />
        </>
      ) : (
        <>
          <p className="text-2xl mb-4">Game Over!</p>
          <p className="text-xl mb-4">Final Score: {score}/{continentData[continent].length}</p>
          <ContinentMap 
            continent={continent} 
            countries={[]} 
            onCountryClick={() => {}}
            highlightedCountries={highlightedCountries}
          />
          <Button onClick={restartGame} className="mt-4">Start Over</Button>
        </>
      )}
      <Toaster />
    </div>
  )
}