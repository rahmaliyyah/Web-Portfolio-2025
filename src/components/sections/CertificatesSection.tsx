import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Award, ExternalLink } from 'lucide-react';

const certificates = [
  {
    id: 1,
    title: 'Software Engineer Fundamentals (HTML, CSS & JS)',
    issuer: 'Revou Academy',
    date: 'Jan 2025',
    badge: '🎓',
    link: 'https://drive.google.com/file/d/1wVspSL92Gxi-ymLdQXM8YGhuLvbeJ8D6/view?usp=sharing', 
  },
  {
    id: 2,
    title: 'ReactJS Beginner',
    issuer: 'Skill Up Academy',
    date: 'Dec 2025',
    badge: '⚛️',
    link: 'https://drive.google.com/file/d/1EN9wynu7zqc9eW9TET4TZqHKChh8eOIv/view?usp=sharing',
  },
  {
    id: 3,
    title: 'Full-Stack Web Development',
    issuer: 'freeCodeCamp',
    date: '2023',
    badge: '🏆',
    link: '#',
  },
  {
    id: 4,
    title: 'JavaScript Algorithms',
    issuer: 'HackerRank',
    date: '2022',
    badge: '💻',
    link: '#',
  },
  {
    id: 5,
    title: 'Python for Data Science',
    issuer: 'IBM',
    date: '2023',
    badge: '🐍',
    link: '#',
  },
  {
    id: 6,
    title: 'CSS Essentials',
    issuer: 'Cisco Networking Academy',
    date: 'Dec 2025',
    badge: '🎨',
    link: 'https://drive.google.com/file/d/1bsdMjOJFGkT2YaTkt9O_W4P4-pybVXu3/view?usp=sharing',
  },
  {
    id: 7,
    title: 'Redis Fundamentals',
    issuer: 'Redis University',
    date: 'Oct 2025',
    badge: '🎨',
    link: 'https://drive.google.com/file/d/1z8tnwVXzeHRuwxYLAwCZ9uTs5hR1r8xP/view?usp=sharing',
  },
  {
    id: 8,
    title: 'MongoDB Essentials',
    issuer: 'MongoDB University',
    date: 'Oct 2025',
    badge: '🎨',
    link: 'https://www.credly.com/users/rahma-aliyyah/badges',
  },
];

interface CertificatesSectionProps {
  visible: boolean;
}

export const CertificatesSection = ({ visible }: CertificatesSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (visible) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, y: 50, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        }
      );
    }
  }, [visible]);

  const handleCardClick = (link: string) => {
    if (link && link !== '#') {
      window.open(link, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-20 relative z-10"
    >
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
          <span className="text-gradient">Courses & Certificates</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Continuous learning is my superpower
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
        {certificates.map((cert, index) => (
          <div
            key={cert.id}
            ref={el => { if (el) cardsRef.current[index] = el; }}
            onClick={() => handleCardClick(cert.link)}
            className="glass rounded-2xl p-6 hover:glow-box transition-all duration-500 group cursor-pointer opacity-0 hover:scale-105 relative"
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
            
            <p className="text-xs text-muted-foreground/60 mb-3">
              {cert.date}
            </p>

            {/* External Link Icon */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ExternalLink className="w-5 h-5 text-neon-purple" />
            </div>
            
            {/* Hover effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 via-transparent to-neon-pink/5" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};