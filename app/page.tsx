import Link from 'next/link'
import { Button } from "@/components/ui/button"

const continents = [
  { name: 'North America', slug: 'north-america' },
  { name: 'South America', slug: 'south-america' },
  { name: 'Europe', slug: 'europe' },
  { name: 'Africa', slug: 'africa' },
  { name: 'Asia', slug: 'asia' },
  { name: 'Oceania', slug: 'oceania' },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Choose a continent</h1>
      <div className="grid grid-cols-2 gap-4">
        {continents.map((continent) => (
          <Link key={continent.slug} href={`/${continent.slug}`}>
            <Button className="w-full text-lg">{continent.name}</Button>
          </Link>
        ))}
      </div>
    </div>
  )
}