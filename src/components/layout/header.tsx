
'use client';

import Link from 'next/link';
import { Search, User, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Skills', href: '#skills' },
  { label: 'Tools', href: '#tools' },
  { label: 'Contacts', href: '#contact' },
];

export default function AppHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Avoid hydration mismatch
  }

  const NavLinks = ({ inSheet = false }: { inSheet?: boolean }) => (
    <>
      {navItems.map((item) => {
        const linkElement = (
          <Link
            href={item.href}
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors px-3 py-2 rounded-md"
            // onClick to close sheet is handled by SheetClose when inSheet is true
          >
            {item.label}
          </Link>
        );

        if (inSheet) {
          return (
            <SheetClose asChild key={item.href}>
              {linkElement}
            </SheetClose>
          );
        } else {
          // When not in a sheet (desktop), render the Link directly with its key
          return (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors px-3 py-2 rounded-md"
            >
              {item.label}
            </Link>
          );
        }
      })}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="#home" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-primary">QA</span>
          <span className="font-semibold text-foreground hidden sm:inline-block">Quality Insights Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          <NavLinks />
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5 text-foreground/80" />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Login">
            <User className="h-5 w-5 text-foreground/80" />
          </Button>

          {/* Mobile Navigation Trigger */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-6 w-6 text-foreground/80" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background p-6">
                <div className="flex justify-between items-center mb-6">
                   <SheetClose asChild>
                     <Link href="#home" className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-primary">QA</span>
                     </Link>
                   </SheetClose>
                  <SheetClose asChild>
                     <Button variant="ghost" size="icon" aria-label="Close menu">
                        <X className="h-6 w-6 text-foreground/80" />
                      </Button>
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-4">
                  <NavLinks inSheet={true} />
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
