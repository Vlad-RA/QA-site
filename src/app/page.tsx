import AppHeader from '@/components/layout/header';
import HeroSection from '@/components/sections/hero';
import SkillsSection from '@/components/sections/skills';
import AiPredictorSection from '@/components/sections/ai-predictor';
import ContactSection from '@/components/sections/contact';
import AppFooter from '@/components/layout/footer';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <AppHeader />
      <main className="flex-grow">
        <HeroSection />
        <SkillsSection />
        <AiPredictorSection />
        <ContactSection />
      </main>
      <AppFooter />
    </div>
  );
}

