import Hero from '@/components/Hero';
import Header from '@/components/Header';
import StatsSection from '@/components/StatsSection';
import AchievementsSection from '@/components/AchievementsSection';
import RecruitersSection from '@/components/RecruitersSection';
import TeamSection from '@/components/TeamSection';
import RegistrationSection from '@/components/RegistrationSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full bg-black text-white selection:bg-[var(--color-neon-blue)] selection:text-black">
      <Header />
      <div className="flex-1 relative">
        <Hero />
      </div>
      <StatsSection />
      <AchievementsSection />
      <RecruitersSection />
      <TeamSection />
      <RegistrationSection />
      <FAQSection />
      <Footer />
    </main>
  );
}
