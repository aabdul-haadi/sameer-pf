import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, ArrowRight, Wand2, Sparkles, Palette, Layers, PenTool, Monitor } from 'lucide-react';
import { useAdmin } from '@/context/AdminContext';
import { useToast } from '@/hooks/use-toast';
import pfLogo from '@/assets/pf-logo-2.png';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { login, isAuthenticated, isLoading: authLoading } = useAdmin();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(username, password);
    
    if (success) {
      toast({
        title: 'Welcome back!',
        description: 'Successfully logged in to admin panel.',
      });
      navigate('/admin/dashboard');
    } else {
      toast({
        title: 'Invalid credentials',
        description: 'Please check your username and password.',
        variant: 'destructive',
      });
    }
    
    setIsLoading(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Mesh */}
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 30% 20%, hsl(43 74% 49% / 0.08) 0%, transparent 50%), radial-gradient(circle at 70% 80%, hsl(43 74% 49% / 0.05) 0%, transparent 40%)',
              'radial-gradient(circle at 70% 20%, hsl(43 74% 49% / 0.08) 0%, transparent 50%), radial-gradient(circle at 30% 80%, hsl(43 74% 49% / 0.05) 0%, transparent 40%)',
            ]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Interactive Glow */}
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full opacity-10 pointer-events-none hidden lg:block"
          style={{
            background: 'radial-gradient(circle, hsl(43 74% 49% / 0.3) 0%, transparent 70%)',
          }}
          animate={{
            left: `calc(50% + ${mousePosition.x * 5}px)`,
            top: `calc(50% + ${mousePosition.y * 5}px)`,
            x: '-50%',
            y: '-50%',
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
        />

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      {/* Left Side - Creative Visual */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Floating Design Elements */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute top-24 left-16"
        >
          <motion.div
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="w-52 p-4 rounded-2xl bg-card/80 backdrop-blur-xl border border-primary/20 shadow-2xl"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <div className="text-sm font-semibold text-foreground">Creating Magic</div>
                <div className="text-xs text-muted-foreground">Design in progress</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  animate={{ width: ['0%', '100%', '0%'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="h-full bg-gradient-to-r from-primary to-primary/50 rounded-full"
                />
              </div>
              <div className="text-[10px] text-muted-foreground">Crafting your vision...</div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute top-1/3 right-20"
        >
          <motion.div
            animate={{ y: [0, 10, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="w-48 p-4 rounded-2xl bg-card/70 backdrop-blur-xl border border-border shadow-xl"
          >
            <div className="flex items-center gap-2 mb-3">
              <Palette className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-foreground">Color Palette</span>
            </div>
            <div className="flex gap-2">
              <motion.div whileHover={{ scale: 1.1 }} className="w-8 h-8 rounded-lg bg-primary shadow-lg" />
              <motion.div whileHover={{ scale: 1.1 }} className="w-8 h-8 rounded-lg bg-accent shadow-lg" />
              <motion.div whileHover={{ scale: 1.1 }} className="w-8 h-8 rounded-lg bg-foreground shadow-lg" />
              <motion.div whileHover={{ scale: 1.1 }} className="w-8 h-8 rounded-lg bg-muted shadow-lg" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="absolute bottom-1/3 left-24"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="w-40 p-3 rounded-xl bg-card/60 backdrop-blur-sm border border-border shadow-lg"
          >
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-3.5 h-3.5 text-primary" />
              <span className="text-[10px] font-medium text-foreground">Layers</span>
            </div>
            <div className="space-y-1.5">
              {['Design Layer', 'Effects', 'Background'].map((layer, i) => (
                <div key={layer} className={`flex items-center gap-2 px-2 py-1 rounded ${i === 0 ? 'bg-primary/10' : 'bg-muted/50'}`}>
                  <div className={`w-2 h-2 rounded-sm ${i === 0 ? 'bg-primary' : 'bg-muted-foreground/40'}`} />
                  <span className="text-[9px] text-muted-foreground">{layer}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Floating Icons */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/3"
        >
          <div className="p-4 rounded-2xl bg-primary/10 backdrop-blur-sm border border-primary/20">
            <PenTool className="w-8 h-8 text-primary" />
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/3"
        >
          <div className="p-3 rounded-xl bg-accent/10 backdrop-blur-sm border border-accent/20">
            <Monitor className="w-6 h-6 text-primary/70" />
          </div>
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-1/4 right-1/4"
        >
          <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
            <Sparkles className="w-10 h-10 text-primary/60" />
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <img src={pfLogo} alt="SAM-VISUALS" className="h-36 w-auto mx-auto mb-8" />
            <h1 className="text-5xl font-bold text-foreground mb-4">
              SAM<span className="text-gradient">-VISUALS</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-md">
              Where Creativity Meets Excellence
            </p>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-3 gap-8">
              {[
                { value: '500+', label: 'Projects' },
                { value: '50+', label: 'Clients' },
                { value: '5★', label: 'Rating' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <img src={pfLogo} alt="SAM-VISUALS" className="h-24 w-auto mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground">
              SAM<span className="text-primary">-VISUALS</span>
            </h1>
          </div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            {/* Card Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-[2rem] blur-xl opacity-50" />
            
            <div className="relative bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-8 shadow-2xl overflow-hidden">
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl">
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: 'linear-gradient(90deg, transparent, hsl(43 74% 49% / 0.3), transparent)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                />
              </div>
              
              {/* Card Accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              
              <div className="relative z-10">
                <div className="text-center mb-8">
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", delay: 0.3 }}
                    className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center border border-primary/20 shadow-lg shadow-primary/10"
                  >
                    <Wand2 className="w-10 h-10 text-primary" />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-3xl font-bold text-foreground"
                  >
                    Welcome Back
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-muted-foreground mt-2"
                  >
                    Sign in to your creative dashboard
                  </motion.p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Username */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-foreground">Username</label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity -m-0.5" />
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter username"
                          className="w-full pl-12 pr-4 py-4 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>

                  {/* Password */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-2"
                  >
                    <label className="text-sm font-medium text-foreground">Password</label>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent rounded-xl opacity-0 group-focus-within:opacity-100 transition-opacity -m-0.5" />
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Enter password"
                          className="w-full pl-12 pr-14 py-4 rounded-xl bg-muted/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </motion.div>

                  {/* Submit */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    whileHover={{ scale: 1.02, boxShadow: '0 20px 40px -15px hsl(43 74% 49% / 0.3)' }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-4 rounded-xl font-semibold bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-primary/20 relative overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      ) : (
                        <>
                          Sign In to Dashboard
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.button>
                </form>
              </div>
            </div>
          </motion.div>

          {/* Back Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-8"
          >
            <a href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to website
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
