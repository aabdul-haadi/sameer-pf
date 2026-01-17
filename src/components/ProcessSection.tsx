import { motion } from 'framer-motion';
import samPhoto from '@/assets/sam-photo.png';

const steps = [
  {
    number: '01',
    title: 'Submit Request',
    description: 'Share your video needs and project details to get started.',
  },
  {
    number: '02',
    title: 'Video Editing',
    description: 'Our team edits and you can request revisions to perfect it.',
  },
  {
    number: '03',
    title: 'Final Delivery',
    description: 'Receive the final video with all necessary adjustments.',
  },
];

export function ProcessSection() {
  return (
    <section id="process" className="py-8 sm:py-16 md:py-20 relative overflow-hidden bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden bg-muted">
              <img
                src={samPhoto}
                alt="Sam - Video Editor"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-badge mb-3 sm:mb-4 text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 sm:py-1">Process</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 sm:mt-3 md:mt-4 mb-6 sm:mb-8 md:mb-10 lg:mb-12">
              How our video editing service{' '}
              <span className="text-gradient">works for you</span>
            </h2>

            {/* Steps */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {steps.map((step, index) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="flex gap-4 sm:gap-5 md:gap-6"
                >
                  {/* Number */}
                  <div className="flex-shrink-0 w-8 sm:w-10 md:w-12 text-muted-foreground/50 text-xs sm:text-sm font-medium pt-0.5 sm:pt-1">
                    {step.number}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-4 sm:pb-5 md:pb-6 lg:pb-8 border-b border-border last:border-0">
                    <h3 className="text-lg sm:text-xl font-semibold mb-1.5 sm:mb-2 text-foreground">
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}