import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faUsers, faTag, faCube, faImage } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { projects } from '../data/projects';
import ProjectObject from './Scenes/ProjectObject';

export default function ProjectPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const project = projects.find(p => p.id === id);
    const [show3D, setShow3D] = useState(true);

    if (!project) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-display text-slate-800 mb-4">Projet introuvable</h1>
                    <button 
                        onClick={() => navigate('/')} 
                        className="text-indigo-600 hover:text-indigo-800 underline font-body"
                    >
                        Retourner à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen bg-gray-50 flex flex-col"
        >
            {/* Navigation Bar */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none">
                <Link 
                    to="/" 
                    className="pointer-events-auto bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg hover:bg-white transition-colors text-slate-700 hover:text-indigo-600 border border-white/20"
                >
                    <FontAwesomeIcon icon={faArrowLeft} className="w-5 h-5" />
                </Link>
            </nav>

            <div className="flex-1 flex flex-col lg:flex-row h-screen overflow-hidden">
                
                {/* Left Side: Visuals (Image or 3D) */}
                <div className="w-full lg:w-[45%] h-[40vh] lg:h-full relative bg-slate-200">
                    <div className="absolute top-4 right-4 z-20 flex gap-2">
                        {project.obj && (
                            <button 
                                onClick={() => setShow3D(!show3D)}
                                className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all text-sm font-bold text-slate-700 hover:text-indigo-600 flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={show3D ? faImage : faCube} />
                                {show3D ? "Voir Images" : "Voir 3D"}
                            </button>
                        )}
                    </div>

                    <div className="w-full h-full relative">
                        {show3D && project.obj ? (
                            <div className="w-full h-full bg-slate-100">
                                <ProjectObject objName={project.obj} />
                            </div>
                        ) : (
                             <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover"
                            />
                        )}
                        {/* Overlay Gradient on Image Mode */}
                        {!show3D && <div className="absolute inset-0 bg-gradient-to-t from-gray-50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-gray-50 pointer-events-none"></div>}
                    </div>
                </div>

                {/* Right Side: Content */}
                <div className="w-full lg:w-[55%] h-full overflow-y-auto px-8 md:px-16 py-12 lg:py-24 bg-gray-50 relative">
                    <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="max-w-2xl"
                    >
                        <div className="flex items-center gap-3 text-indigo-500 font-bold mb-4 tracking-wider uppercase text-sm">
                            <FontAwesomeIcon icon={faUsers} />
                            <span>{project.details}</span>
                        </div>

                        <h1 
                            className="text-[clamp(3rem,5vw,5rem)] leading-none text-slate-800 mb-8"
                            style={{ fontFamily: "'Vina Sans', sans-serif" }}
                        >
                            {project.title}
                        </h1>

                        <div className="flex flex-wrap gap-2 mb-12">
                            {project.tags.map(tag => (
                                <span 
                                    key={tag} 
                                    className="px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-lg text-indigo-600 text-sm font-semibold flex items-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faTag} className="w-3 h-3 opacity-50" />
                                    {tag}
                                </span>
                            ))}
                        </div>

                        <div className="prose prose-lg prose-slate prose-headings:font-display">
                            <h3 className="text-2xl font-bold text-slate-800 mb-4 font-display uppercase tracking-wide">
                                À propos du projet
                            </h3>
                            <p className="text-lg leading-relaxed text-slate-600 mb-8 font-body">
                                {project.descriptionlg || project.description}
                            </p>
                            
                            {/* Additional placeholders for realistic project page feel */}
                            <h3 className="text-2xl font-bold text-slate-800 mb-4 font-display uppercase tracking-wide">
                                Challenges Techniques
                            </h3>
                            <p className="text-lg leading-relaxed text-slate-600 mb-8 font-body">
                                Ce projet a présenté plusieurs défis intéressants, notamment dans l'optimisation des performances et l'architecture du code. L'utilisation de {project.tags[0]} a été décisive pour la réussite de l'implémentation.
                            </p>
                        </div>

                    </motion.div>
                </div>

            </div>
        </motion.div>
    );
}
