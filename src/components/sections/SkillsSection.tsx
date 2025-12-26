import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const skillCategories = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'TypeScript', 'Python', 'HTML5', 'CSS3', 'SQL'],
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Three.js', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'Docker', 'Figma', 'VS Code', 'Linux'],
  },
];

interface SkillsSectionProps {
  scrollProgress: number;
}

export const SkillsSection = ({ scrollProgress }: SkillsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    cardsRef.current.forEach((card, index) => {
      if (!card) return;
      
      gsap.fromTo(
        card,
        { opacity: 0, y: 80, scale: 0.9, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'top 50%',
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
      <div className="section-content w-full max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Technical Arsenal</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A constellation of technologies I use to bring ideas to life
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              ref={el => { if (el) cardsRef.current[index] = el; }}
              className="glass rounded-2xl p-6 hover:glow-box transition-all duration-500 group"
            >
              <h3 className="font-display text-lg text-neon-purple mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm bg-muted/50 rounded-full text-foreground/80 hover:bg-neon-purple/20 hover:text-foreground transition-colors duration-300 cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <p className="mt-12 text-center text-muted-foreground text-sm animate-pulse">
          ✨ Hover over the 3D constellation in the background to explore
        </p>
      </div>
    </section>
  );
};
