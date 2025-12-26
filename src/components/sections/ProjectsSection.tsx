import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';

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
  {
    id: 4,
    title: 'Smart Home Dashboard',
    description: 'IoT dashboard for managing smart home devices with real-time monitoring and automation.',
    problem: 'Complex smart home management',
    role: 'Full-Stack Developer',
    skills: ['React', 'Node.js', 'MQTT', 'WebSocket'],
    results: '30% energy savings reported',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
    github: '#',
    live: '#',
  },
  {
    id: 5,
    title: 'Fitness Tracker App',
    description: 'Mobile-first fitness tracking with AI-powered workout recommendations and progress analytics.',
    problem: 'Generic workout plans don\'t fit everyone',
    role: 'Frontend Developer',
    skills: ['React Native', 'TypeScript', 'Firebase', 'TensorFlow'],
    results: '50K+ active users',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=600&h=400&fit=crop',
    github: '#',
    live: '#',
  },
  {
    id: 6,
    title: 'Collaborative Whiteboard',
    description: 'Real-time collaborative drawing and brainstorming tool with infinite canvas.',
    problem: 'Remote teams need better visual collaboration',
    role: 'Lead Developer',
    skills: ['Next.js', 'WebRTC', 'Canvas API', 'Redis'],
    results: 'Used by 200+ teams',
    image: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&h=400&fit=crop',
    github: '#',
    live: '#',
  },
];

const PROJECTS_PER_PAGE = 3;
const totalPages = Math.ceil(projects.length / PROJECTS_PER_PAGE);

interface ProjectsSectionProps {
  scrollProgress: number;
}

export const ProjectsSection = ({ scrollProgress }: ProjectsSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragCurrentX = useRef(0);

  const getCurrentProjects = () => {
    const start = currentPage * PROJECTS_PER_PAGE;
    return projects.slice(start, start + PROJECTS_PER_PAGE);
  };

  const animatePageTransition = useCallback((direction: 'next' | 'prev') => {
    if (isAnimating || !carouselRef.current) return;
    setIsAnimating(true);

    const cards = carouselRef.current.querySelectorAll('.project-card');
    
    // Exit animation with particle trail effect
    gsap.to(cards, {
      x: direction === 'next' ? -100 : 100,
      opacity: 0,
      scale: 0.8,
      rotateY: direction === 'next' ? -15 : 15,
      stagger: 0.05,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        // Update page
        setCurrentPage(prev => {
          if (direction === 'next') {
            return prev < totalPages - 1 ? prev + 1 : 0;
          }
          return prev > 0 ? prev - 1 : totalPages - 1;
        });

        // Entrance animation
        setTimeout(() => {
          if (!carouselRef.current) return;
          const newCards = carouselRef.current.querySelectorAll('.project-card');
          
          gsap.fromTo(
            newCards,
            { 
              x: direction === 'next' ? 100 : -100, 
              opacity: 0, 
              scale: 0.8,
              rotateY: direction === 'next' ? 15 : -15 
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              rotateY: 0,
              stagger: 0.1,
              duration: 0.6,
              ease: 'back.out(1.2)',
              onComplete: () => setIsAnimating(false),
            }
          );
        }, 50);
      },
    });
  }, [isAnimating]);

  const goToPage = useCallback((page: number) => {
    if (isAnimating || page === currentPage) return;
    const direction = page > currentPage ? 'next' : 'prev';
    
    setIsAnimating(true);
    const cards = carouselRef.current?.querySelectorAll('.project-card');
    
    if (cards) {
      gsap.to(cards, {
        x: direction === 'next' ? -100 : 100,
        opacity: 0,
        scale: 0.8,
        stagger: 0.05,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setCurrentPage(page);
          setTimeout(() => {
            if (!carouselRef.current) return;
            const newCards = carouselRef.current.querySelectorAll('.project-card');
            gsap.fromTo(
              newCards,
              { x: direction === 'next' ? 100 : -100, opacity: 0, scale: 0.8 },
              {
                x: 0,
                opacity: 1,
                scale: 1,
                stagger: 0.1,
                duration: 0.5,
                ease: 'back.out(1.2)',
                onComplete: () => setIsAnimating(false),
              }
            );
          }, 50);
        },
      });
    }
  }, [isAnimating, currentPage]);

  // Handle wheel for horizontal navigation
  const handleWheel = useCallback((e: WheelEvent) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.5) {
      e.preventDefault();
      if (e.deltaX > 30) animatePageTransition('next');
      else if (e.deltaX < -30) animatePageTransition('prev');
    }
  }, [animatePageTransition]);

  // Drag handlers
  const handleDragStart = useCallback((clientX: number) => {
    setIsDragging(true);
    dragStartX.current = clientX;
    dragCurrentX.current = clientX;
  }, []);

  const handleDragMove = useCallback((clientX: number) => {
    if (!isDragging) return;
    dragCurrentX.current = clientX;
  }, [isDragging]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    
    const diff = dragStartX.current - dragCurrentX.current;
    if (Math.abs(diff) > 100) {
      if (diff > 0) animatePageTransition('next');
      else animatePageTransition('prev');
    }
  }, [isDragging, animatePageTransition]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    section.addEventListener('wheel', handleWheel, { passive: false });
    return () => section.removeEventListener('wheel', handleWheel);
  }, [handleWheel]);

  // Initial animation
  useEffect(() => {
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll('.project-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.9 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.15, 
          ease: 'power3.out',
          delay: 0.3
        }
      );
    }
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-center px-8 py-20 relative z-10"
      onMouseDown={(e) => handleDragStart(e.clientX)}
      onMouseMove={(e) => handleDragMove(e.clientX)}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
      onTouchEnd={handleDragEnd}
    >
      <div className="section-content w-full max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Featured Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Crafted with passion, built with purpose
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => animatePageTransition('prev')}
            disabled={isAnimating}
            className="group p-3 glass rounded-full hover:glow-box transition-all duration-300 disabled:opacity-50"
          >
            <ChevronLeft className="w-6 h-6 text-foreground group-hover:text-neon-purple transition-colors" />
          </button>
          
          {/* Pagination Indicators */}
          <div className="flex gap-3">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`relative w-3 h-3 rounded-full transition-all duration-500 ${
                  currentPage === index 
                    ? 'bg-neon-purple scale-125 glow-box' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
                }`}
              >
                {currentPage === index && (
                  <span className="absolute inset-0 rounded-full bg-neon-purple/50 animate-ping" />
                )}
              </button>
            ))}
          </div>
          
          <button
            onClick={() => animatePageTransition('next')}
            disabled={isAnimating}
            className="group p-3 glass rounded-full hover:glow-box transition-all duration-300 disabled:opacity-50"
          >
            <ChevronRight className="w-6 h-6 text-foreground group-hover:text-neon-purple transition-colors" />
          </button>
        </div>
        
        {/* Projects Carousel */}
        <div 
          ref={carouselRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full cursor-grab active:cursor-grabbing select-none"
        >
          {getCurrentProjects().map((project) => (
            <div
              key={project.id}
              className="project-card group relative glass rounded-2xl overflow-hidden hover:glow-box transition-all duration-500"
            >
              {/* Project Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  draggable={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Floating links */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a 
                    href={project.github}
                    className="p-2 glass rounded-full hover:bg-neon-purple/20 transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github className="w-4 h-4" />
                  </a>
                  <a 
                    href={project.live}
                    className="p-2 glass rounded-full hover:bg-neon-purple/20 transition-colors"
                    onClick={(e) => e.stopPropagation()}
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
                
                {/* Role Badge */}
                <div className="mb-3">
                  <span className="text-xs text-neon-cyan">{project.role}</span>
                </div>
                
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

        {/* Page indicator text */}
        <div className="text-center mt-8 text-muted-foreground text-sm">
          <span className="text-neon-purple font-display">{currentPage + 1}</span>
          <span className="mx-2">/</span>
          <span>{totalPages}</span>
          <span className="ml-4 opacity-60">Drag or use arrows to navigate</span>
        </div>
      </div>
    </section>
  );
};
