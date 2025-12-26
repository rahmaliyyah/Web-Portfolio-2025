import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management and AI-powered recommendations.',
    problem: 'Small businesses struggling with online presence',
    role: 'Full-Stack Developer',
    skills: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    results: '40% increase in conversion rates',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
    github: '#',
    live: '#',
  },
  {
    id: 2,
    title: 'AI Study Assistant',
    description: 'An intelligent learning companion that adapts to student learning patterns using machine learning.',
    problem: 'Students need personalized study guidance',
    role: 'Lead Developer',
    skills: ['Python', 'TensorFlow', 'React', 'PostgreSQL'],
    results: '25% improvement in test scores',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop',
    github: '#',
    live: '#',
  },
  {
    id: 3,
    title: 'Portfolio Generator',
    description: 'A no-code platform for creatives to build stunning portfolios with customizable 3D elements.',
    problem: 'Designers lack coding skills for portfolios',
    role: 'Frontend Developer',
    skills: ['Three.js', 'React', 'TypeScript', 'Tailwind'],
    results: '10,000+ portfolios created',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
    github: '#',
    live: '#',
  },
];

interface ProjectsSectionProps {
  visible: boolean;
}

export const ProjectsSection = ({ visible }: ProjectsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (visible) {
      gsap.fromTo(
        cardsRef.current,
        { opacity: 0, x: -50, rotateY: -10 },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          duration: 1,
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
          <span className="text-gradient">Featured Projects</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Crafted with passion, built with purpose
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={el => { if (el) cardsRef.current[index] = el; }}
            className="group relative glass rounded-2xl overflow-hidden hover:glow-box transition-all duration-500 opacity-0"
          >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
              
              {/* Floating links */}
              <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <a 
                  href={project.github}
                  className="p-2 glass rounded-full hover:bg-neon-purple/20 transition-colors"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a 
                  href={project.live}
                  className="p-2 glass rounded-full hover:bg-neon-purple/20 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            {/* Content */}
            <div className="p-6">
              <h3 className="font-display text-xl font-bold mb-2 text-foreground group-hover:text-gradient transition-all duration-300">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                {project.description}
              </p>
              
              {/* Skills */}
              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 text-xs bg-neon-purple/10 text-neon-purple rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              
              {/* Results */}
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  <span className="text-neon-cyan">Impact:</span> {project.results}
                </p>
              </div>
            </div>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-transparent to-neon-pink/10" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
