import { useState, useEffect, useRef, useCallback } from 'react';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scene3D } from '@/components/three/Scene3D';
import { Navigation } from '@/components/Navigation';
import { HeroSection } from '@/components/sections/HeroSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { CertificatesSection } from '@/components/sections/CertificatesSection';
import { ContactSection } from '@/components/sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

const Index = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const totalSections = 6;

  // Initialize Lenis for buttery-smooth continuous scrolling
  useEffect(() => {
    lenisRef.current = new Lenis({
      duration: 1.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenisRef.current.on('scroll', (e: any) => {
      ScrollTrigger.update();
      
      // Calculate scroll progress (0-1)
      const progress = e.progress || 0;
      setScrollProgress(progress);
      
      // Calculate current section based on scroll position
      const sectionHeight = window.innerHeight;
      const scrollY = e.scroll;
      const newSection = Math.min(
        totalSections - 1,
        Math.floor((scrollY + sectionHeight * 0.3) / sectionHeight)
      );
      setCurrentSection(newSection);
    });

    // GSAP ScrollTrigger update on scroll
    gsap.ticker.add((time) => {
      lenisRef.current?.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
      gsap.ticker.remove((time) => {
        lenisRef.current?.raf(time * 1000);
      });
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Setup scroll-triggered animations for each section
  useEffect(() => {
    if (!contentRef.current) return;

    const sections = contentRef.current.querySelectorAll('section');
    
    sections.forEach((section, index) => {
      // Parallax effect for section content
      gsap.fromTo(
        section.querySelector('.section-content'),
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );

      // Fade out as user scrolls past
      gsap.to(section.querySelector('.section-content'), {
        opacity: 0.3,
        y: -50,
        ease: 'power2.in',
        scrollTrigger: {
          trigger: section,
          start: 'bottom 50%',
          end: 'bottom top',
          scrub: 1,
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Track mouse position for 3D effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
      setCursorPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleNavigate = useCallback((section: number) => {
    const targetY = section * window.innerHeight;
    lenisRef.current?.scrollTo(targetY, { duration: 1.5 });
  }, []);

  const handleEnter = useCallback(() => {
    lenisRef.current?.scrollTo(window.innerHeight, { duration: 1.5 });
  }, []);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-screen bg-background"
    >
      {/* Cursor glow effect */}
      <div 
        className="cursor-glow hidden md:block"
        style={{ 
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
      />

      {/* 3D Background Scene */}
      <Scene3D 
        currentSection={currentSection} 
        mousePosition={mousePosition}
        scrollProgress={scrollProgress}
      />

      {/* Navigation */}
      <Navigation 
        currentSection={currentSection} 
        onNavigate={handleNavigate}
      />

      {/* Main Content - Continuous scrolling canvas */}
      <main ref={contentRef} className="relative z-10">
        <HeroSection onEnter={handleEnter} />
        <SkillsSection scrollProgress={scrollProgress} />
        <ProjectsSection scrollProgress={scrollProgress} />
        <ExperienceSection scrollProgress={scrollProgress} />
        <CertificatesSection scrollProgress={scrollProgress} />
        <ContactSection mousePosition={mousePosition} scrollProgress={scrollProgress} />
      </main>

      {/* Section indicators */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
        {[...Array(totalSections)].map((_, index) => (
          <button
            key={index}
            onClick={() => handleNavigate(index)}
            className={`w-2 h-2 rounded-full transition-all duration-500 ${
              currentSection === index
                ? 'bg-neon-purple w-2 h-8 glow-box'
                : 'bg-muted-foreground/30 hover:bg-muted-foreground/60'
            }`}
          />
        ))}
      </div>

      {/* Scroll progress indicator */}
      <div className="fixed bottom-0 left-0 right-0 h-[2px] z-50">
        <div 
          className="h-full bg-gradient-neon transition-all duration-100"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Background gradient overlays with parallax */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-[150px] transition-transform duration-1000"
          style={{ transform: `translateY(${scrollProgress * -200}px)` }}
        />
        <div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[150px] transition-transform duration-1000"
          style={{ transform: `translateY(${scrollProgress * 200}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink/5 rounded-full blur-[200px]"
        />
      </div>
    </div>
  );
};

export default Index;
