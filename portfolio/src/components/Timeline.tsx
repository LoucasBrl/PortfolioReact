import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import BookScene from './Scenes/BookScene';
import ComputerScene from './Scenes/ComputerScene';
import SittedScene from './Scenes/SittedScene';

interface TimelineItemProps {
  data: {
    title: string;
    location: string;
    date: string;
    description: string;
    Scene: React.ComponentType;
  };
  index: number;
}

const timelineData = [
  {
    title: "Lycée d'Altitude",
    location: "Briançon",
    date: "2020 - 2023",
    description: "Baccalauréat Général - Spécialités Mathématiques & Numérique et Sciences Informatiques. Mention Très Bien.",
    Scene: BookScene
  },
  {
    title: "IUT2 Informatique",
    location: "Grenoble",
    date: "2023 - Présent",
    description: "BUT Informatique. Apprentissage approfondi du développement logiciel, web, systèmes et réseaux. Travail en équipe et gestion de projets.",
    Scene: ComputerScene
  },
  {
    title: "Futur / Stage",
    location: "À venir",
    date: "2025",
    description: "Recherche de nouvelles opportunités pour mettre en pratique mes compétences et continuer à apprendre.",
    Scene: SittedScene
  }
];

function TimelineItem({ data, index }: TimelineItemProps) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className={`flex flex-col md:flex-row items-center justify-center w-full mb-24 relative ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content Side */}
      <div className={`w-full md:w-5/12 px-6 pl-12 md:pl-6 flex flex-col items-start text-left ${isEven ? 'md:items-end md:text-right' : 'md:items-start md:text-left'}`}>
        <div className="bg-glass-surface backdrop-blur-md border border-glass-border p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all w-full max-w-md">
          <span className="font-display text-[#3D4D55] text-xl tracking-wider">{data.date}</span>
          <h3 className="font-display text-3xl text-[#10232A] mt-2 mb-1">{data.title}</h3>
          <h4 className="font-body font-bold text-[#A79E9C] mb-4">{data.location}</h4>
          <p className="font-body text-[#10232A]/80 leading-relaxed text-lg">
            {data.description}
          </p>
        </div>
      </div>

      {/* Center Line Point */}
      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#d8cfc9] border-4 border-[#10232A] z-20 hidden md:block shadow-[0_0_0_4px_rgba(16,35,42,0.2)] top-1/2 -translate-y-1/2"></div>

      {/* 3D Scene Side */}
      <div className={`w-full md:w-5/12 h-[300px] px-6 pl-12 md:pl-6 flex flex-col items-center ${isEven ? 'md:items-start' : 'md:items-end'} mt-8 md:mt-0`}>
          <div className="w-full h-full relative rounded-2xl overflow-hidden bg-glass-surface/30 border border-white/20">
             <data.Scene />
          </div>
      </div>
      
    </motion.div>
  );
}

export default function Timeline() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div ref={ref} className="relative w-full max-w-7xl mx-auto py-20 px-4">
      
      {/* Central Line */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-[#d8cfc9]/30 -translate-x-1/2 rounded-full">
        <motion.div 
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#10232A] via-[#3D4D55] to-[#10232A] rounded-full"
        />
      </div>

      <div className="flex flex-col gap-12">
        {timelineData.map((item, index) => (
          <TimelineItem key={index} data={item} index={index} />
        ))}
      </div>
    </div>
  );
}
