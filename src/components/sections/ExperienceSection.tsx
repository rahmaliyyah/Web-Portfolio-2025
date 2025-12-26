import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Briefcase, Calendar } from 'lucide-react';

const experiences = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'Tech Startup',
    period: '2024 - Present',
    description: 'Building responsive web applications with React and TypeScript. Implemented new features that increased user engagement by 35%.',
    skills: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 2,
    title: 'Freelance Web Developer',
    company: 'Self-Employed',
    period: '2023 - 2024',
    description: 'Delivered 10+ custom websites for small businesses. Focused on performance optimization and modern design.',
    skills: ['Next.js', 'Node.js', 'MongoDB'],
  },
  {
    id: 3,
    title: 'Open Source Contributor',
    company: 'Various Projects',
    period: '2022 - Present',
    description: 'Contributing to open-source projects, including UI component libraries and developer tools.',
    skills: ['Git', 'JavaScript', 'Documentation'],
  },
];

interface ExperienceSectionProps {
  visible: boolean;
}

export const ExperienceSection = ({ visible }: ExperienceSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (visible) {
      gsap.fromTo(
        itemsRef.current,
        { opacity: 0, x: -80, scale: 0.95 },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );
    }
  }, [visible]);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-20 relative z-10"
    >
      <div className="text-center mb-16">
        <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
          <span className="text-gradient">Experience</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          My journey in the world of technology
        </p>
      </div>
      
      <div className="max-w-4xl w-full relative">
        {/* Timeline line */}
        <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-purple via-neon-pink to-neon-orange transform md:-translate-x-1/2" />
        
        {experiences.map((exp, index) => (
          <div
            key={exp.id}
            ref={el => { if (el) itemsRef.current[index] = el; }}
            className={`relative flex items-center mb-12 opacity-0 ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-neon-purple transform md:-translate-x-1/2 glow-box z-10" />
            
            {/* Content card */}
            <div className={`ml-8 md:ml-0 md:w-[45%] ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
              <div className="glass rounded-2xl p-6 hover:glow-box transition-all duration-500 group">
                <div className="flex items-center gap-2 text-neon-cyan text-sm mb-2">
                  <Calendar className="w-4 h-4" />
                  {exp.period}
                </div>
                
                <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-gradient transition-all">
                  {exp.title}
                </h3>
                
                <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                  <Briefcase className="w-4 h-4" />
                  {exp.company}
                </div>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {exp.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {exp.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 text-xs bg-neon-purple/10 text-neon-purple rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
