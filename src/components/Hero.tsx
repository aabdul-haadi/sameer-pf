import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

// Shuffle grid components
const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 8,
    src: "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1820&q=80",
  },
];

const shuffle = (array: any[]) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<any>(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[350px] sm:h-[450px] md:h-[550px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

// Animated text component for creative typing effect
function AnimatedText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(' ');
  
  return (
    <motion.span className={className}>
      {words.map((word, wordIndex) => (
        <motion.span
          key={wordIndex}
          className="inline-block mr-[0.15em] sm:mr-[0.2em]"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + wordIndex * 0.1,
            ease: [0.6, -0.05, 0.01, 0.99]
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}

// Animated gradient text with shimmer
function ShimmerText({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span 
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.3 }}
    >
      <span className="text-gradient relative z-10">{children}</span>
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/30 to-transparent"
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        style={{ WebkitBackgroundClip: 'text' }}
      />
    </motion.span>
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
      {/* Modern Abstract Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        
        {/* Large Abstract Shapes */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-0 right-0 w-[80%] h-[80%] pointer-events-none"
        >
          {/* Main Gradient Blob */}
          <motion.div
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.02, 0.98, 1]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 right-[-20%] w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] md:w-[700px] md:h-[700px] lg:w-[900px] lg:h-[900px]"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-full blur-2xl sm:blur-3xl" />
          </motion.div>
          
          {/* Secondary Blob */}
          <motion.div
            animate={{ 
              rotate: [0, -5, 5, 0],
              x: [0, 20, -20, 0]
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] right-[10%] w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]"
          >
            <div className="absolute inset-0 bg-gradient-to-tl from-accent/20 via-primary/15 to-transparent rounded-full blur-xl sm:blur-2xl" />
          </motion.div>
        </motion.div>

        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
            backgroundSize: '40px 40px sm:50px 50px lg:60px 60px'
          }}
        />

        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-background to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl lg:max-w-7xl mx-auto">
          {/* Mobile: Single column layout */}
          <div className="lg:hidden">
            <div className="text-center">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/30 bg-primary/10 mb-6 sm:mb-8 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                </motion.div>
                <span className="text-xs sm:text-sm font-medium text-primary">Premium Creative Agency</span>
              </motion.div>

              {/* Headline with Creative Animation */}
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-4 sm:mb-6 overflow-hidden">
                <AnimatedText text="Elevate Your" className="block" delay={0.2} />
                <div className="mt-1 sm:mt-2">
                  <ShimmerText>Visual Identity</ShimmerText>
                </div>
              </div>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-xl mx-auto mb-6 sm:mb-8 px-2 sm:px-0"
              >
                We craft stunning logos, thumbnails, posters, and videos that make your brand unforgettable. Trusted by creators worldwide.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
              >
                <motion.a 
                  href="#work" 
                  className="btn-primary group relative overflow-hidden px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    View Our Work
                    <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.a>
                <motion.a 
                  href="https://wa.me/923263778850?text=Hi!%20I'm%20interested%20in%20your%20creative%20services.%20Let's%20discuss%20my%20project." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary group px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Let's Talk
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-10 sm:mt-12 flex flex-col items-center"
              >
                <div className="flex -space-x-2 sm:-space-x-3 mb-3 sm:mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + i * 0.1, type: "spring" }}
                      className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-background bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xs font-bold text-primary shadow-md sm:shadow-lg"
                    >
                      {String.fromCharCode(64 + i)}
                    </motion.div>
                  ))}
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="text-xs sm:text-sm text-muted-foreground"
                >
                  Trusted by <span className="text-foreground font-semibold">500+</span> creators worldwide
                </motion.p>
              </motion.div>
            </div>
          </div>

          {/* Desktop: Two column layout with shuffle grid */}
          <div className="hidden lg:grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: "spring" }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 mb-8 backdrop-blur-sm"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-primary" />
                </motion.div>
                <span className="text-sm font-medium text-primary">Premium Creative Agency</span>
              </motion.div>

              {/* Headline with Creative Animation */}
              <div className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 overflow-hidden">
                <AnimatedText text="Elevate Your" className="block" delay={0.2} />
                <div className="mt-2">
                  <ShimmerText>Visual Identity</ShimmerText>
                </div>
              </div>

              {/* Subheadline */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10"
              >
                We craft stunning logos, thumbnails, posters, and videos that make your brand unforgettable. Trusted by creators worldwide.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="flex items-center gap-4"
              >
                <motion.a 
                  href="#work" 
                  className="btn-primary group relative overflow-hidden px-5 py-3 text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center">
                    View Our Work
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/0 via-white/20 to-primary/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                </motion.a>
                <motion.a 
                  href="https://wa.me/923263778850?text=Hi!%20I'm%20interested%20in%20your%20creative%20services.%20Let's%20discuss%20my%20project." 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary group px-5 py-3 text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Let's Talk
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
                className="mt-16"
              >
                <div className="flex -space-x-3 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 1.1 + i * 0.1, type: "spring" }}
                      className="w-10 h-10 rounded-full border-2 border-background bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center text-xs font-bold text-primary shadow-lg"
                    >
                      {String.fromCharCode(64 + i)}
                    </motion.div>
                  ))}
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.6 }}
                  className="text-sm text-muted-foreground"
                >
                  Trusted by <span className="text-foreground font-semibold">500+</span> creators worldwide
                </motion.p>
              </motion.div>
            </div>

            {/* Right Grid - Shuffle Grid (Desktop only) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring" }}
              className="relative"
            >
              {/* Floating decorative elements around grid */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 w-20 h-20 rounded-full border border-dashed border-primary/20"
              />
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 backdrop-blur-sm border border-primary/10 shadow-lg"
              />
              
              {/* The Shuffle Grid */}
              <div className="relative">
                <ShuffleGrid />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border border-muted-foreground/30 sm:border-2 flex items-start justify-center p-1.5 sm:p-2"
        >
          <motion.div className="w-0.5 h-1.5 sm:w-1 sm:h-2 rounded-full bg-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
}