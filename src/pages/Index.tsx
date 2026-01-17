import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { FeaturedVideoSection } from '@/components/FeaturedVideoSection';
import { Services } from '@/components/Services';
import { FeaturesSection } from '@/components/FeaturesSection';
import { ProcessSection } from '@/components/ProcessSection';
import { PortfolioSection } from '@/components/PortfolioSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { Pricing } from '@/components/Pricing';
import { FAQSection } from '@/components/FAQSection';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { useAdmin } from '@/context/AdminContext';
import { portfolioData as defaultPortfolioData } from '@/data/portfolio';

const Index = () => {
  const { portfolioData } = useAdmin();

  // Use database data if available, otherwise fall back to default
  const getItems = (category: 'logos' | 'posters' | 'shorts' | 'longvideos') => {
    const dbItems = portfolioData[category];
    if (dbItems && dbItems.length > 0) {
      return dbItems.map(item => ({
        id: item.id,
        image: item.thumbnail_url || item.media_url,
        title: item.title,
        media_type: item.media_type,
        youtube_url: item.youtube_url,
        thumbnail_url: item.thumbnail_url,
        media_url: item.media_url,
      }));
    }
    // Return empty array for new categories without defaults
    if (category === 'shorts' || category === 'longvideos') {
      return [];
    }
    return defaultPortfolioData[category] || [];
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Header + Hero Section */}
        <Hero />

        {/* Featured Video Section */}
        <FeaturedVideoSection
          youtubeUrl="https://www.youtube.com/watch?v=GJ7unPa6flw"
          title="Featured Edit"
          subtitle="One flagship example of our pacing, color, and storytelling."
        />

        {/* Creative Services Showcase */}
        <div id="work">
          <PortfolioSection
            id="logos"
            badge="Design Work"
            title="Logo Designs"
            description="Memorable brand identities that make lasting impressions"
            items={getItems('logos')}
            aspectRatio="video"
          />

          <PortfolioSection
            id="posters"
            badge="Design Work"
            title="Posters & Graphics"
            description="Eye-catching visuals for events, products, and campaigns"
            items={getItems('posters')}
            aspectRatio="video"
          />

          <PortfolioSection
            id="shorts"
            badge="Editing Work"
            title="YouTube Shorts & Reels"
            description="Vertical format videos optimized for mobile viewing"
            items={getItems('shorts')}
            aspectRatio="reel"
          />

          <PortfolioSection
            id="longvideos"
            badge="Editing Work"
            title="Long-Form Videos"
            description="Professional video editing that tells your story beautifully"
            items={getItems('longvideos')}
            aspectRatio="video"
          />
        </div>

        {/* Services Section */}
        <Services />

        {/* Features Section */}
        <FeaturesSection />

        {/* Process Section */}
        <ProcessSection />

        {/* Reviews / Testimonials Section */}
        <TestimonialsSection />

        {/* Pricing Section */}
        <Pricing />

        {/* FAQs Section */}
        <FAQSection />

        {/* Contact Form Section */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
