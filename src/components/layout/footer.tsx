import Link from 'next/link';
import { Github, Linkedin, Twitter } from 'lucide-react';

export default function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 border-t border-border/40 text-foreground/60">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <Link href="#home" className="text-lg font-bold text-primary">
              Quality Insights Hub
            </Link>
            <p className="text-sm mt-1">
              &copy; {currentYear} Quality Insights Hub. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-primary transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Twitter" className="hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-6 text-center text-xs text-foreground/50">
          <p>Built with Next.js and Tailwind CSS. Designed for QA professionals.</p>
        </div>
      </div>
    </footer>
  );
}
