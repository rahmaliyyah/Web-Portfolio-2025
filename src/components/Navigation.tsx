import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentSection: number;
  onNavigate: (section: number) => void;
}

const navItems = [
  { label: 'Home', section: 0 },
  { label: 'Skills', section: 1 },
  { label: 'Projects', section: 2 },
  { label: 'Experience', section: 3 },
  { label: 'Certificates', section: 4 },
  { label: 'Contact', section: 5 },
];

export const Navigation = ({ currentSection, onNavigate }: NavigationProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
      );
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <nav 
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-8 py-4 opacity-0"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button 
            onClick={() => onNavigate(0)}
            className="font-display text-xl font-bold text-gradient hover:scale-105 transition-transform"
          >
            R.
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1 glass rounded-full px-2 py-2">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.section)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  currentSection === item.section
                    ? 'bg-neon-purple/20 text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 glass rounded-full"
          >
            {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="absolute inset-0 bg-background/95 backdrop-blur-xl"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
              {navItems.map((item, index) => (
                <button
                  key={item.label}
                  onClick={() => {
                    onNavigate(item.section);
                    setIsMobileOpen(false);
                  }}
                  className={`font-display text-3xl font-bold transition-all duration-300 animate-fade-in-up ${
                    currentSection === item.section
                      ? 'text-gradient'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
