import { motion } from 'framer-motion';
import { Video, FolderKanban, Film, BarChart3, Lightbulb, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const features = [
  {
    icon: Video,
    title: 'Video Editing',
    description: 'Professional video editing with smooth transitions, cinematic effects, and advanced color grading.',
    gradient: 'from-pink-500/20 to-purple-500/20',
    iconBg: 'from-pink-500/30 to-purple-500/30',
  },
  {
    icon: FolderKanban,
    title: 'Project Management',
    description: 'Efficient workflow management with clear task assignment, timelines, and progress tracking.',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    iconBg: 'from-blue-500/30 to-cyan-500/30',
  },
  {
    icon: Film,
    title: 'Video Production',
    description: 'Custom video production tailored to match your brand identity and creative vision.',
    gradient: 'from-amber-500/20 to-orange-500/20',
    iconBg: 'from-amber-500/30 to-orange-500/30',
  },
  {
    icon: BarChart3,
    title: 'Client Reporting',
    description: 'Detailed performance insights and analytics to keep clients informed and confident.',
    gradient: 'from-green-500/20 to-emerald-500/20',
    iconBg: 'from-green-500/30 to-emerald-500/30',
  },
  {
    icon: Lightbulb,
    title: 'Content Strategy',
    description: 'Data-driven content planning designed to increase engagement and deliver measurable results.',
    gradient: 'from-yellow-500/20 to-amber-500/20',
    iconBg: 'from-yellow-500/30 to-amber-500/30',
  },
  {
    icon: Share2,
    title: 'Social Media Management',
    description: 'Scheduling and managing video content across multiple social media platforms with consistency.',
    gradient: 'from-violet-500/20 to-purple-500/20',
    iconBg: 'from-violet-500/30 to-purple-500/30',
  },
];

export function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  return (
    <section id="features" className="py-8 sm:py-12 md:py-14 lg:py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-primary/5 rounded-full blur-2xl sm:blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 bg-accent/5 rounded-full blur-xl sm:blur-2xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10 md:mb-12"
        >
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="section-badge mb-3 sm:mb-4 text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 sm:py-1"
          >
            Features
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 sm:mt-3 md:mt-4 mb-2 sm:mb-3">
            What Makes Us <span className="text-gradient">Stand Out</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-lg sm:max-w-xl mx-auto px-2 sm:px-0">
            We combine creativity with strategy to deliver exceptional results for every project.
          </p>
        </motion.div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative">
          <div className="overflow-hidden px-2">
            <motion.div
              className="flex"
              animate={{ x: `-${activeIndex * 100}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {features.map((feature, index) => (
                <div key={feature.title} className="w-full flex-shrink-0 px-1 sm:px-2">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`relative p-5 sm:p-6 rounded-2xl sm:rounded-3xl bg-gradient-to-br ${feature.gradient} border border-border/50 backdrop-blur-sm`}
                  >
                    {/* Decorative Elements */}
                    <div className="absolute top-3 right-3 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/5 blur-xl" />
                    
                    {/* Icon */}
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center mb-4 sm:mb-5 shadow-md sm:shadow-lg`}
                    >
                      <feature.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-foreground" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-foreground">{feature.title}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{feature.description}</p>

                    {/* Feature Number */}
                    <div className="absolute bottom-3 right-3 text-4xl sm:text-5xl md:text-6xl font-bold text-foreground/5">
                      0{index + 1}
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-md sm:shadow-lg"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
            </motion.button>
            
            {/* Dots */}
            <div className="flex gap-1.5 sm:gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-6 sm:w-8 bg-primary' : 'w-1.5 sm:w-2 bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-card border border-border flex items-center justify-center shadow-md sm:shadow-lg"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
            </motion.button>
          </div>
        </div>

        {/* Desktop Grid - Creative Bento Layout */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 sm:gap-5 lg:gap-6 max-w-5xl lg:max-w-6xl mx-auto">
          {features.map((feature, index) => {
            // Create varied sizes for bento effect
            const isLarge = index === 0 || index === 3;
            
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6, transition: { duration: 0.3 } }}
                className={`group relative rounded-2xl lg:rounded-3xl overflow-hidden ${
                  isLarge ? 'row-span-1' : ''
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-300`} />
                
                {/* Glass Card */}
                <div className="relative h-full p-5 lg:p-6 border border-border/50 rounded-2xl lg:rounded-3xl backdrop-blur-sm bg-card/30">
                  {/* Decorative Glow */}
                  <div className="absolute -top-8 -right-8 w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-primary/10 blur-xl lg:blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Icon with Gradient */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    className={`w-12 h-12 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-gradient-to-br ${feature.iconBg} flex items-center justify-center mb-3 lg:mb-4 shadow-lg group-hover:shadow-xl transition-shadow`}
                  >
                    <feature.icon className="w-6 h-6 lg:w-7 lg:h-7 text-foreground" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-base lg:text-lg font-bold mb-1.5 lg:mb-2 text-foreground group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-xs lg:text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Feature Number Watermark */}
                  <div className="absolute bottom-3 right-3 text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground/[0.03] group-hover:text-primary/[0.08] transition-colors">
                    0{index + 1}
                  </div>

                  {/* Hover Border Glow */}
                  <div className="absolute inset-0 rounded-2xl lg:rounded-3xl border-2 border-primary/0 group-hover:border-primary/20 transition-colors pointer-events-none" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}