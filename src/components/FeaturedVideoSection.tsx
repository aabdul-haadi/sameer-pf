import { motion } from "framer-motion";

function toEmbedUrl(youtubeUrl: string) {
  try {
    // Accepts: watch?v=, youtu.be/, embed/, shorts/
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
      /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    ];

    for (const p of patterns) {
      const m = youtubeUrl.match(p);
      if (m?.[1]) return `https://www.youtube.com/embed/${m[1]}`;
    }
  } catch {
    // ignore
  }
  return youtubeUrl; // fallback: assume already an embed URL
}

export function FeaturedVideoSection({
  youtubeUrl,
  title = "Featured Video",
  subtitle = "A quick look at our editing quality and storytelling.",
}: {
  youtubeUrl: string;
  title?: string;
  subtitle?: string;
}) {
  const embedUrl = toEmbedUrl(youtubeUrl);

  return (
    <section aria-label="Featured video" className="py-8 sm:py-10 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mb-6 sm:mb-8 text-center"
        >
          <span className="section-badge text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 sm:py-1">Featured</span>
          <h2 className="mt-2 sm:mt-3 md:mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">{title}</h2>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2 sm:px-0">{subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="rounded-xl sm:rounded-2xl overflow-hidden border border-border bg-card shadow-md sm:shadow-[var(--shadow-card)]"
        >
          {/* Fixed height container that maintains aspect ratio */}
          <div className="relative w-full" style={{ height: "auto" }}>
            {/* Mobile: Fixed height */}
            <div className="block sm:hidden">
              <div className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={embedUrl}
                  title={title}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
            
            {/* Desktop: Aspect ratio */}
            <div className="hidden sm:block">
              <div className="relative w-full aspect-video">
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src={embedUrl}
                  title={title}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}