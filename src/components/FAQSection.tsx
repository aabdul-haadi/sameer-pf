import { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const faqs = [
  {
    question: 'What services do you offer?',
    answer: 'We provide video editing, professional thumbnail designing, development, social media optimization, and more, tailored to meet your needs.',
  },
  {
    question: 'How long does it take to receive the final video?',
    answer: 'Most standard projects are delivered within 24-48 hours. For larger or more complex videos, we\'ll let you know the estimated delivery time upfront. Need it faster? Let us know, rush delivery options are available.',
  },
  {
    question: 'Do you offer revisions?',
    answer: 'We offer up to 3 revisions per video to make sure the final result aligns perfectly according to your vision.',
  },
  {
    question: 'What platforms do you create videos for?',
    answer: 'We specialize in creating videos for YouTube, Instagram, TikTok, Facebook, LinkedIn, and other social media platforms.',
  },
  {
    question: 'How do I share my footage with your team?',
    answer: 'Once you place an order, we\'ll provide you with a secure upload link (like Google Drive, Dropbox, or WeTransfer). You can upload your raw footage, assets, and any notes or references directly there.',
  },
  {
    question: 'How do I get started?',
    answer: 'Simply fill out the contact form with your project details, and our team will get in touch to discuss your video needs.',
  },
];

export const FAQSection = forwardRef<HTMLElement>((_, ref) => {
  return (
<section ref={ref} id="faq" className="py-8 sm:py-12 md:py-16 relative bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16">
          {/* Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-20 lg:self-start"
          >
            <span className="section-badge mb-3 sm:mb-4 text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 sm:py-1">FAQ</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-2 sm:mt-3 md:mt-4 mb-4 sm:mb-6 md:mb-8">
              Frequently asked{' '}
              <span className="text-gradient">questions about us</span>
            </h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="px-4 sm:px-5 py-2 sm:py-3 rounded-full bg-primary/10 border border-primary/20">
                <p className="text-xs sm:text-sm text-primary font-medium">
                  Have a question?<br />
                  Let's discuss it now!
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2 sm:py-3 rounded-full font-semibold bg-foreground text-background hover:opacity-90 transition-opacity text-xs sm:text-sm"
              >
                Book an appointment
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
              </a>
            </div>
          </motion.div>

          {/* Right Side - FAQs */}
          <div className="space-y-0">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="py-4 sm:py-5 border-b border-border group"
              >
                <div className="flex items-start justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold mb-1.5 sm:mb-2 text-foreground">
                      {faq.question}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground text-[10px] sm:text-xs font-bold">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

FAQSection.displayName = 'FAQSection';