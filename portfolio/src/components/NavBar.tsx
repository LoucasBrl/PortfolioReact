import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl bg-glass-dark rounded-full px-8 py-3 flex justify-between items-center shadow-lg"
    >
        <a href="#mainpage" className="group z-50">
            <span className='text-3xl font-display text-white tracking-wide group-hover:text-indigo-400 transition-colors'>LB</span>
        </a>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden text-white/80 hover:text-white transition-colors z-50 p-1"
        >
          {isOpen ? <XMarkIcon className="h-8 w-8" /> : <Bars3Icon className="h-8 w-8" />}
        </button>

        {/* Desktop Menu */}
        <div className='hidden md:flex gap-8 items-center'>
            <a href="#mainpage" className='text-white/80 hover:text-white font-body text-lg transition-colors'>Me Connaitre</a>
            <a href="#parcourspage" className='text-white/80 hover:text-white font-body text-lg transition-colors'>Mon Parcours</a>
            <a href="#projetspage" className='text-white/80 hover:text-white font-body text-lg transition-colors'>Mes Projets</a>
            <a href="#contactpage" className='px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-body text-lg transition-all border border-white/10'>Me Contacter</a>
            
            <div className="h-6 w-px bg-white/20 mx-2"></div>

            <Link to="/knowledge" className='group w-10 h-10 flex items-center justify-center rounded-full bg-[#10232A] border border-[#d8cfc9]/30 hover:bg-[#3D4D55] hover:border-[#d8cfc9] text-[#d8cfc9] hover:text-white transition-all shadow-lg hover:shadow-[#3D4D55]/50 hover:scale-110' title="Nexus Cyber">
                <FontAwesomeIcon icon={faProjectDiagram} className="text-sm group-hover:animate-pulse"/>
            </Link>
        </div>
    </motion.nav>

    {/* Mobile Menu Overlay */}
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-glass-dark backdrop-blur-xl border border-white/10 rounded-3xl p-6 z-40 md:hidden flex flex-col items-center gap-6 shadow-2xl"
        >
            <a href="#mainpage" onClick={() => setIsOpen(false)} className='text-white/90 hover:text-white font-body text-xl font-medium transition-colors'>Me Connaitre</a>
            <a href="#parcourspage" onClick={() => setIsOpen(false)} className='text-white/90 hover:text-white font-body text-xl font-medium transition-colors'>Mon Parcours</a>
            <a href="#projetspage" onClick={() => setIsOpen(false)} className='text-white/90 hover:text-white font-body text-xl font-medium transition-colors'>Mes Projets</a>
            <a href="#contactpage" onClick={() => setIsOpen(false)} className='px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-body text-xl transition-all border border-white/10 w-full text-center'>Me Contacter</a>
            
            <div className="w-full h-px bg-white/20"></div>

            <Link to="/knowledge" onClick={() => setIsOpen(false)} className='group w-12 h-12 flex items-center justify-center rounded-full bg-[#10232A] border border-[#d8cfc9]/30 hover:bg-[#3D4D55] hover:border-[#d8cfc9] text-[#d8cfc9] hover:text-white transition-all shadow-lg hover:shadow-[#3D4D55]/50'>
                <FontAwesomeIcon icon={faProjectDiagram} className="text-lg group-hover:animate-pulse"/>
            </Link>
        </motion.div>
      )}
    </AnimatePresence>
    </>
  );
}
