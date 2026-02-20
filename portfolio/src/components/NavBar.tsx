import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

export default function NavBar() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-4xl bg-glass-dark rounded-full px-8 py-3 flex justify-between items-center shadow-lg"
    >
        <a href="#mainpage" className="group">
            <span className='text-3xl font-display text-white tracking-wide group-hover:text-indigo-400 transition-colors'>LB</span>
        </a>
        
        <div className='hidden md:flex gap-8 items-center'>
            <a href="#mainpage" className='text-white/80 hover:text-white font-body text-lg transition-colors'>Me Connaitre</a>
            <a href="#parcourspage" className='text-white/80 hover:text-white font-body text-lg transition-colors'>Mon Parcours</a>
            <a href="#projetspage" className='text-white/80 hover:text-white font-body text-lg transition-colors'>Mes Projets</a>
            <a href="#contactpage" className='px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white font-body text-lg transition-all border border-white/10'>Me Contacter</a>
            
            <div className="h-6 w-px bg-white/20 mx-2"></div>

            <Link to="/knowledge" className='group w-10 h-10 flex items-center justify-center rounded-full bg-slate-900 border border-indigo-500/30 hover:bg-indigo-600 hover:border-indigo-400 text-indigo-300 hover:text-white transition-all shadow-lg hover:shadow-indigo-500/50 hover:scale-110' title="Nexus Cyber">
                <FontAwesomeIcon icon={faProjectDiagram} className="text-sm group-hover:animate-pulse"/>
            </Link>
        </div>
    </motion.nav>
  );
}
