import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const certificates = [
  {
    id: 1,
    title: 'AWS Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: '2024',
    badge: '☁️',
  },
  {
    id: 2,
    title: 'React Developer Certificate',
    issuer: 'Meta',
    date: '2023',
    badge: '⚛️',
  },
  {
    id: 3,
    title: 'Full-Stack Web Development',
    issuer: 'freeCodeCamp',
    date: '2023',
    badge: '🏆',
  },
  {
    id: 4,
    title: 'JavaScript Algorithms',
    issuer: 'HackerRank',
    date: '2022',
    badge: '💻',
  },
  {
    id: 5,
    title: 'Python for Data Science',
    issuer: 'IBM',
    date: '2023',
    badge: '🐍',
  },
  {
    id: 6,
    title: 'UI/UX Design Fundamentals',
    issuer: 'Google',
    date: '2023',
    badge: '🎨',
  },
];

interface CertificatesSectionProps {
  scrollProgress: number;
}

export const CertificatesSection = ({ scrollProgress }: CertificatesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.fromTo(
        card,
        { opacity: 0, y: 60, rotateX: -20, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-20 relative z-10"
    >
      <div className="section-content w-full max-w-5xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Continuous learning is my superpower
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <div
              key={cert.id}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className="glass rounded-2xl p-6 hover:glow-box transition-all duration-500 group cursor-pointer hover:scale-105 relative"
            >
              {/* Badge */}
              <div className="text-4xl mb-4 animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                {cert.badge}
              </div>
              
              <h3 className="font-display text-lg font-bold text-foreground mb-2 group-hover:text-gradient transition-all">
                {cert.title}
              </h3>
              
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <Award className="w-4 h-4 text-neon-cyan" />
                {cert.issuer}
              </div>
              
              <p className="text-xs text-muted-foreground/60">
                {cert.date}
              </p>
              
              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 via-transparent to-neon-pink/5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
