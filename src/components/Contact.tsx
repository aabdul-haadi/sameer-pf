import { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle, User, Briefcase, FileText, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const WHATSAPP_NUMBER = '+923263778850';

const serviceOptions = [
  { value: 'logo', label: 'Logo Design' },
  { value: 'thumbnail', label: 'YouTube Thumbnail' },
  { value: 'poster', label: 'Poster Design' },
  { value: 'video', label: 'Video Editing' },
  { value: 'bundle', label: 'Complete Bundle' },
];

export const Contact = forwardRef<HTMLElement>((_, ref) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    project: '',
    service: '',
    description: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.service || !formData.description.trim()) {
      toast({
        title: 'Please fill all required fields',
        variant: 'destructive',
      });
      return;
    }

    // Build WhatsApp message
    const serviceName = serviceOptions.find((s) => s.value === formData.service)?.label || formData.service;
    const message = `🎨 *New Project Inquiry*

👤 *Name:* ${formData.name}
📁 *Project:* ${formData.project || 'Not specified'}
🎯 *Service:* ${serviceName}

📝 *Description:*
${formData.description}

---
Sent from SAM-VISUALS Website`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: 'Opening WhatsApp...',
      description: 'Complete your message in WhatsApp to send.',
    });
  };

  const handleLetsTalk = () => {
    const message = encodeURIComponent("Hi! I'm interested in your creative services. Let's discuss my project.");
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section ref={ref} id="contact" className="py-12 sm:py-16 md:py-20 relative">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl lg:max-w-4xl mx-auto"
        >
          {/* Card */}
          <div className="relative p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-border bg-muted overflow-hidden shadow-lg">
            {/* Glow Background */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[500px] md:w-[600px] h-[200px] sm:h-[250px] md:h-[300px] opacity-20 sm:opacity-30">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(43_74%_49%/0.3),transparent_70%)]" />
              </div>
            </div>

            <div className="relative z-10">
              <div className="text-center mb-6 sm:mb-8">
                <span className="section-badge mb-3 sm:mb-4 text-xs sm:text-sm px-2.5 sm:px-3 py-0.5 sm:py-1">Get Started</span>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mt-3 sm:mt-4 mb-3 sm:mb-4">
                  Ready to <span className="text-gradient">Stand Out</span>?
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground max-w-lg sm:max-w-xl mx-auto px-2 sm:px-0">
                  Fill in the details below and we'll get back to you within 24 hours.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 max-w-lg sm:max-w-xl mx-auto">
                {/* Name */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground">
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    Your Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-background border border-border text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-primary/50 transition-all"
                    required
                  />
                </div>

                {/* Project Name */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground">
                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    Project / Brand Name
                  </label>
                  <input
                    type="text"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    placeholder="Your brand or project name"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-background border border-border text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>

                {/* Service Type */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    What do you need? <span className="text-primary">*</span>
                  </label>
                  <select
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-background border border-border text-sm sm:text-base text-foreground focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="">Select a service...</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-1.5 sm:space-y-2">
                  <label className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-foreground">
                    <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                    Tell us about your vision <span className="text-primary">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe your project, style preferences, colors, or any inspiration you have..."
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-background border border-border text-sm sm:text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                    required
                  />
                </div>

                {/* Submit */}
                <button type="submit" className="w-full btn-primary justify-center group px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base">
                  <Send className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  Send via WhatsApp
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              {/* Quick Contact */}
              <div className="text-center mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-border">
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">Or connect directly</p>
                <button onClick={handleLetsTalk} className="btn-secondary group px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base">
                  <MessageCircle className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" />
                  Let's Talk on WhatsApp
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1.5 sm:ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';