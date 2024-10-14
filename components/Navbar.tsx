'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const continents = [
  { name: 'North America', slug: 'north-america' },
  { name: 'South America', slug: 'south-america' },
  { name: 'Europe', slug: 'europe' },
  { name: 'Africa', slug: 'africa' },
  { name: 'Asia', slug: 'asia' },
  { name: 'Oceania', slug: 'oceania' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const NavItems = () => (
    <>
      {continents.map((continent) => (
        <Link
          className={`text-sm font-medium transition-colors hover:text-primary ${pathname === `/${continent.slug}` ? 'text-primary' : 'text-muted-foreground'}`}
          href={`/${continent.slug}`}
          key={continent.slug}
        >
          {continent.name}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-blue-300/95 backdrop-blur supports-[backdrop-filter]:bg-blue-300/60 flex justify-center px-4">
      <div className="container flex h-14 items-center justify-between">
        <Link className="flex items-center space-x-2" href="/">
          <span className="font-bold">Geography Quiz</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <NavItems />
        </nav>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              className="px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
              variant="ghost"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="pl-1 pr-0" side="right">
            <div className="flex flex-col space-y-3">
              <MobileLink href="/" onOpenChange={setIsOpen}>
                Home
              </MobileLink>
              {continents.map((continent) => (
                <MobileLink href={`/${continent.slug}`} key={continent.slug} onOpenChange={setIsOpen}>
                  {continent.name}
                </MobileLink>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

interface MobileLinkProps {
  href: string
  onOpenChange?: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

function MobileLink({ href, onOpenChange, className, children, ...props }: MobileLinkProps) {
  const pathname = usePathname();
  return (
    <Link
      className={`${className} ${pathname === href ? 'text-primary' : 'text-muted-foreground'} block py-2 text-sm font-medium`}
      href={href}
      onClick={() => {
        onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
