'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { northAmericaMap } from '../../svg-definitions/north-america';
import { southAmericaMap } from '../../svg-definitions/south-america';
import { oceaniaMap } from '../../svg-definitions/oceania';
import { asiaMap } from '../../svg-definitions/asia';
import { africaMap } from '../../svg-definitions/africa';
import { europeMap } from '../../svg-definitions/europe';
import ContinentMap from './ContinentMap';

const continentData: Record<string, string[]> = {
  'north-america': Object.entries(northAmericaMap).map(([country]) => country),
  'south-america': Object.entries(southAmericaMap).map(([country]) => country),
  'europe': Object.entries(europeMap).map(([country]) => country),
  'africa': Object.entries(africaMap).map(([country]) => country),
  'asia': Object.entries(asiaMap).map(([country]) => country),
  'oceania': Object.entries(oceaniaMap).map(([country]) => country),
};

export default function ContinentQuiz() {
  const router = useRouter();
  const { continent } = useParams() as { continent: string };
  const [countries, setCountries] = useState<string[]>([]);
  const [currentCountry, setCurrentCountry] = useState<string>('');
  const [score, setScore] = useState<number>(0);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [highlightedCountries, setHighlightedCountries] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const initializeGame = useCallback(() => {
    const continentCountries = continentData[continent];
    setCountries(continentCountries);
    setCurrentCountry(continentCountries[Math.floor(Math.random() * continentCountries.length)]);
    setScore(0);
    setIsGameOver(false);
    setHighlightedCountries({});
    setIsLoading(false);
  }, [continent]);

  useEffect(() => {
    if (!continentData[continent]) {
      router.push('/');
      return;
    }
    initializeGame();
  }, [continent, initializeGame, router]);

  const handleCountryClick = (clickedCountry: string) => {
    if (clickedCountry === currentCountry) {
      toast.success('Correct!');
      setScore(score + 1);
      setHighlightedCountries({ ...highlightedCountries, [clickedCountry]: 'green' });
    } else {
      toast.error('Incorrect!');
      setHighlightedCountries({ ...highlightedCountries, [currentCountry]: 'red' });
    }

    const remainingCountries = countries.filter(country => country !== currentCountry);
    setCountries(remainingCountries);

    if (remainingCountries.length > 0) {
      setCurrentCountry(remainingCountries[Math.floor(Math.random() * remainingCountries.length)]);
    } else {
      setIsGameOver(true);
    }

    setTimeout(() => {
      toast.dismiss();
    }, 2000);
  };

  if (!continentData[continent] || isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-4 capitalize">{continent.replace('-', ' ')} Quiz</h1>
      {isGameOver ? (
        <>
          <p className="text-2xl mb-4">Game Over!</p>
          <p className="text-xl mb-4">Final Score: {score}/{continentData[continent].length}</p>
          <div className="w-full max-w-2xl aspect-square">
            <ContinentMap
              continent={continent}
              countries={[]}
              highlightedCountries={highlightedCountries}
              onCountryClick={() => {}}
            />
          </div>
        </>
      ) : (
        <>
          <p className="text-2xl mb-4">Find: <span className='font-bold'>{currentCountry}</span></p>
          <p className="text-xl mb-4">Score: {score}/{continentData[continent].length}</p>
          <div className="w-full max-w-2xl aspect-square">
            <ContinentMap
              continent={continent}
              countries={countries}
              highlightedCountries={highlightedCountries}
              onCountryClick={handleCountryClick}
            />
          </div>
        </>
      )}
      <Button className="mt-4" onClick={initializeGame}>Start Over</Button>
      <Toaster />
    </div>
  );
}
