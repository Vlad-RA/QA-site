import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section id="home" className="relative py-20 md:py-32 lg:py-40 bg-background">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')",
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        data-ai-hint="abstract code"
      />
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white">
          QA Specialist: Digital Quality Architect
        </h1>
        <p className="mt-6 max-w-3xl mx-auto text-lg md:text-xl text-foreground/80">
          Ensuring the stability, security and efficiency of software products at every stage of development.
        </p>
        <div className="mt-10">
          <Button asChild size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-105">
            <Link href="#skills">
              Learn more
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-5 w-5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
