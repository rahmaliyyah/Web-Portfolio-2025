import { useEffect, useRef, useState, Suspense } from 'react';
import gsap from 'gsap';
import { Github, Linkedin, Mail, Send, Twitter } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { ContactAvatar } from '@/components/three/ContactAvatar';

interface ContactSectionProps {
  mousePosition: { x: number; y: number };
  scrollProgress: number;
}

export const ContactSection = ({ mousePosition, scrollProgress }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    if (!formRef.current || !socialRef.current) return;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 60%',
        end: 'top 20%',
        toggleActions: 'play none none reverse',
      },
    });
    
    tl.fromTo(
      formRef.current,
      { opacity: 0, x: -80 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    )
    .fromTo(
      socialRef.current?.children || [],
      { opacity: 0, scale: 0, rotate: -180 },
      { 
        opacity: 1, 
        scale: 1, 
        rotate: 0, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: 'back.out(1.7)' 
      },
      '-=0.6'
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const socialLinks = [
    { icon: Github, href: 'https://github.com', label: 'GitHub', color: 'hover:text-foreground' },
    { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn', color: 'hover:text-neon-blue' },
    { icon: Twitter, href: 'https://twitter.com', label: 'Twitter', color: 'hover:text-neon-cyan' },
    { icon: Mail, href: 'mailto:rahma@example.com', label: 'Email', color: 'hover:text-neon-pink' },
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-20 relative z-10 overflow-hidden"
    >
      {/* Islamic geometric pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="geometric" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neon-purple" />
            <circle cx="10" cy="10" r="3" fill="none" stroke="currentColor" strokeWidth="0.3" className="text-neon-cyan" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#geometric)" />
        </svg>
      </div>

      <div className="section-content w-full max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Let's Connect</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to collaborate on something extraordinary?
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Form */}
          <div className="order-2 lg:order-1">
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-8 space-y-6"
            >
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground font-medium">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50 transition-all text-foreground placeholder:text-muted-foreground/50"
                  placeholder="Your name"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground font-medium">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50 transition-all text-foreground placeholder:text-muted-foreground/50"
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground font-medium">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 bg-muted/30 border border-border/50 rounded-lg focus:outline-none focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/50 transition-all text-foreground placeholder:text-muted-foreground/50 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              
              <button
                type="submit"
                className="group relative w-full px-8 py-4 font-display text-sm tracking-wider uppercase overflow-hidden rounded-lg"
              >
                <span className="absolute inset-0 bg-gradient-neon opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-300" />
                <span className="relative z-10 text-foreground flex items-center justify-center gap-2">
                  Send Message
                  <Send className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
            </form>
            
            {/* Social Links */}
            <div className="mt-8">
              <h3 className="font-display text-xl font-bold mb-4 text-foreground">
                Or find me on
              </h3>
              <div ref={socialRef} className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 glass rounded-2xl ${social.color} transition-all duration-300 hover:glow-box hover:scale-110 group`}
                  >
                    <social.icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Right Side - 3D Avatar */}
          <div className="order-1 lg:order-2 h-[400px] lg:h-[600px] relative">
            {/* Portal/Black hole effect */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-64 h-64 rounded-full bg-gradient-radial from-neon-purple/20 via-transparent to-transparent animate-pulse" />
              <div className="absolute w-48 h-48 rounded-full bg-gradient-radial from-neon-pink/15 via-transparent to-transparent animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute w-32 h-32 rounded-full bg-gradient-radial from-neon-cyan/10 via-transparent to-transparent animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <Canvas
              camera={{ position: [0, 0, 4], fov: 50 }}
              gl={{ antialias: true, alpha: true }}
              dpr={[1, 2]}
            >
              <Suspense fallback={null}>
                <ContactAvatar mousePosition={mousePosition} />
              </Suspense>
            </Canvas>
            
            {/* Floating code elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {['<code>', 'function()', '{ }', '[];', '=>', '//'].map((code, i) => (
                <span
                  key={i}
                  className="absolute text-neon-purple/30 font-mono text-xs animate-float"
                  style={{
                    left: `${15 + (i * 15)}%`,
                    top: `${20 + (i * 12)}%`,
                    animationDelay: `${i * 0.5}s`,
                  }}
                >
                  {code}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-8 text-center text-muted-foreground text-sm">
        <p>© 2024 Rahma. Crafted with 💜 and lots of coffee.</p>
      </div>
    </section>
  );
};
