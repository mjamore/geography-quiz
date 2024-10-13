'use client'

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'
import { Button } from "@/components/ui/button"
import ContinentMap from './ContinentMap'
import { northAmericaMap } from '../../svg-definitions/north-america'

const continentData: Record<string, string[]> = {
  'north-america': Object.entries(northAmericaMap).map(([country]) => country),
  'south-america': ['Brazil', 'Argentina', 'Colombia', 'Peru', 'Chile'],
  'europe': ['France', 'Germany', 'Italy', 'Spain', 'United Kingdom'],
  'africa': ['Egypt', 'Nigeria', 'South Africa', 'Kenya', 'Morocco'],
  'asia': ['China', 'India', 'Japan', 'South Korea', 'Vietnam'],
  'oceania': ['Australia', 'New Zealand', 'Fiji', 'Papua New Guinea', 'Solomon Islands'],
}

export default function ContinentQuiz() {
  const router = useRouter()
  const { continent } = useParams() as { continent: string }
  const [countries, setCountries] = useState<string[]>([])
  const [currentCountry, setCurrentCountry] = useState<string>('')
  const [score, setScore] = useState<number>(0)
  const [gameOver, setGameOver] = useState<boolean>(false)
  const [highlightedCountries, setHighlightedCountries] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!continentData[continent]) {
      router.push('/')
      return
    }
    initializeGame()
  }, [continent, router])

  const initializeGame = () => {
    const continentCountries = continentData[continent]
    setCountries(continentCountries)
    setCurrentCountry(continentCountries[Math.floor(Math.random() * continentCountries.length)])
    setScore(0)
    setGameOver(false)
    setHighlightedCountries({})
    setIsLoading(false)
  }

  const handleCountryClick = (clickedCountry: string) => {
    if (clickedCountry === currentCountry) {
      toast.success('Correct!')
      setScore(score + 1)
      setHighlightedCountries({...highlightedCountries, [clickedCountry]: 'green'})
    } else {
      toast.error('Incorrect!')
      setHighlightedCountries({...highlightedCountries, [currentCountry]: 'red'})
    }

    const remainingCountries = countries.filter(country => country !== currentCountry)
    setCountries(remainingCountries)

    if (remainingCountries.length > 0) {
      setCurrentCountry(remainingCountries[Math.floor(Math.random() * remainingCountries.length)])
    } else {
      setGameOver(true)
    }

    setTimeout(() => {
      toast.dismiss()
    }, 2000)
  }

  if (!continentData[continent] || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4 capitalize">{continent.replace('-', ' ')} Quiz</h1>
      {!gameOver ? (
        <>
          <p className="text-2xl mb-4">Find: {currentCountry}</p>
          <p className="text-xl mb-4">Score: {score}/{continentData[continent].length}</p>
          <div className="w-full max-w-2xl aspect-square">
            <ContinentMap 
              continent={continent} 
              countries={countries} 
              onCountryClick={handleCountryClick}
              highlightedCountries={highlightedCountries}
            />
          </div>
        </>
      ) : (
        <>
          <p className="text-2xl mb-4">Game Over!</p>
          <p className="text-xl mb-4">Final Score: {score}/{continentData[continent].length}</p>
          <div className="w-full max-w-2xl aspect-square">
            <ContinentMap 
              continent={continent} 
              countries={[]} 
              onCountryClick={() => {}}
              highlightedCountries={highlightedCountries}
            />
          </div>
          <Button onClick={initializeGame} className="mt-4">Start Over</Button>
        </>
      )}
      <Toaster />
    </div>
  )
}