import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Github, Linkedin, Mail, Instagram, Copy, Check, ExternalLink, MessageCircle } from 'lucide-react';

interface ContactSectionProps {
  visible: boolean;
}

export const ContactSection = ({ visible }: ContactSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLDivElement>(null);
  
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    if (visible) {
      const tl = gsap.timeline();
      
      tl.fromTo(
        emailRef.current,
        { opacity: 0, y: 50, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'back.out(1.4)' }
      )
      .fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 100, rotateX: -90 },
        { 
          opacity: 1, 
          y: 0, 
          rotateX: 0,
          duration: 0.8, 
          stagger: 0.15, 
          ease: 'power3.out' 
        },
        '-=0.5'
      );
    }
  }, [visible]);

  const copyEmail = async () => {
    const email = 'rahmaaliyyah29@gmail.com';
    
    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
      } else {
        // Fallback for older browsers or non-HTTPS
        const textArea = document.createElement('textarea');
        textArea.value = email;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        
        const successful = document.execCommand('copy');
        textArea.remove();
        
        if (successful) {
          setCopiedEmail(true);
          setTimeout(() => setCopiedEmail(false), 2000);
        } else {
          alert('Email copied: ' + email);
        }
      }
    } catch (err) {
      console.error('Failed to copy:', err);
      // Last resort: show email in alert
      alert('Copy this email: ' + email);
    }
  };

  const contactMethods = [
    { 
      icon: Github, 
      label: 'GitHub',
      username: '@rahmaaliyyah',
      href: 'https://github.com/rahmaliyyah',
      color: 'from-gray-600 to-gray-800',
      hoverColor: 'hover:shadow-[0_0_30px_rgba(100,100,100,0.5)]',
      description: 'Check out my code'
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn',
      username: 'Rahma Aliyyah',
      href: 'https://www.linkedin.com/in/rahma-aliyyah-374312289/',
      color: 'from-blue-500 to-blue-700',
      hoverColor: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]',
      description: 'Let\'s connect professionally'
    },
    { 
      icon: Instagram, 
      label: 'Instagram',
      username: '@rahmaliyyh',
      href: 'https://www.instagram.com/rahmaliyyh/',
      color: 'from-pink-500 via-purple-500 to-orange-500',
      hoverColor: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.5)]',
      description: 'Follow my journey'
    },
    { 
      icon: MessageCircle, 
      label: 'WhatsApp Business',
      username: '+62 895-2626-8598',
      href: 'https://wa.me/6289526268598?text=Hi%20Rahma!%20I%27d%20like%20to%20discuss%20a%20project',
      color: 'from-green-500 to-green-700',
      hoverColor: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]',
      description: 'Quick business chat'
    },
  ];

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-20 relative z-10"
    >
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl md:text-7xl font-bold mb-6">
          <span className="text-gradient">Let's Connect</span>
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
          Ready to collaborate on something extraordinary?
        </p>
      </div>
      
      <div className="max-w-6xl w-full space-y-12">
        {/* Main Email Card */}
        <div 
          ref={emailRef}
          className="glass rounded-3xl p-6 md:p-12 relative overflow-hidden group opacity-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-neon-pink/10 to-neon-blue/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-gradient-neon flex items-center justify-center glow-box shrink-0">
                <Mail className="w-6 h-6 md:w-8 md:h-8 text-foreground" />
              </div>
              <div>
                <p className="text-xs md:text-sm text-muted-foreground mb-1">Email me directly</p>
                <a 
                  href="mailto:rahmaaliyyah29@gmail.com" 
                  className="text-sm md:text-2xl lg:text-3xl font-display font-bold text-gradient hover:underline break-all"
                >
                  rahmaaliyyah29@gmail.com
                </a>
              </div>
            </div>
            
            <button
              onClick={copyEmail}
              className={`group/btn relative px-6 py-3 md:px-8 md:py-4 font-display text-xs md:text-sm tracking-wider uppercase overflow-hidden rounded-xl transition-all duration-300 w-full md:w-auto shrink-0 ${
                copiedEmail ? 'scale-95' : 'hover:scale-105'
              }`}
            >
              <span className={`absolute inset-0 transition-all duration-300 ${
                copiedEmail 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                  : 'bg-gradient-neon opacity-80 group-hover/btn:opacity-100'
              }`} />
              <span className="absolute inset-0 bg-gradient-neon opacity-0 group-hover/btn:opacity-50 blur-xl transition-opacity duration-300" />
              <span className="relative z-10 text-foreground flex items-center justify-center gap-2 font-bold whitespace-nowrap">
                {copiedEmail ? (
                  <>
                    <Check className="w-4 h-4 md:w-5 md:h-5 animate-bounce" />
                    Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3 md:w-4 md:h-4 group-hover/btn:rotate-12 transition-transform" />
                    Copy Email
                  </>
                )}
              </span>
            </button>
          </div>
        </div>
        
        {/* Contact Method Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => (
            <a
              key={method.label}
              href={method.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative glass rounded-2xl p-6 md:p-8 transition-all duration-500 hover:scale-[1.02] ${method.hoverColor} cursor-pointer`}
              style={{ opacity: 0 }}
            >
              {/* Animated background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${method.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl`} />
              
              {/* Glow effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-transparent via-current to-transparent opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 md:p-4 rounded-xl bg-gradient-to-br ${method.color} transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <method.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <ExternalLink className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                
                <h3 className="font-display text-lg md:text-xl font-bold mb-1 text-foreground">
                  {method.label}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground mb-3">
                  {method.description}
                </p>
                <p className={`text-sm md:text-base font-medium bg-gradient-to-r ${method.color} bg-clip-text text-transparent break-all`}>
                  {method.username}
                </p>
              </div>
              
              {/* Corner decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className={`absolute inset-0 bg-gradient-to-br ${method.color} blur-3xl rounded-full transform translate-x-16 -translate-y-16`} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};