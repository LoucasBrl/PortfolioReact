import { useState } from 'react';
import Select, { type MultiValue } from 'react-select';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { tagOptions } from '../data/tags';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';

type TagOption = { value: string; label: string; };

export default function Browse() {
    const [selectedTags, setSelectedTags] = useState<TagOption[]>([]);

    const filteredProjects = selectedTags.length === 0 
        ? projects 
        : projects.filter(p => p.tags.some(tag => selectedTags.map(t => t.value).includes(tag)));

    const handleTagChange = (newValue: MultiValue<TagOption>) => {
        setSelectedTags([...newValue]);
    };

    return (
        <section id="projetspage" className="relative min-h-screen w-full py-24 px-6 md:px-12 flex flex-col items-center bg-gray-50">
            <div className="max-w-7xl w-full">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                    <h2 
                        className="text-[clamp(3rem,8vw,6rem)] text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-900 leading-none"
                        style={{ fontFamily: "'Vina Sans', sans-serif" }}
                    >
                        MES PROJETS
                    </h2>
                    
                    <div className="flex flex-col gap-4 w-full md:w-96">
                         <div className="w-full">
                            <Select
                                isMulti
                                options={tagOptions}
                                onChange={handleTagChange}
                                value={selectedTags}
                                placeholder="Filtrer par technologies..."
                                className="font-body text-slate-700"
                                styles={{
                                    control: (base) => ({
                                        ...base,
                                        borderRadius: '1rem',
                                        border: '1px solid rgba(255,255,255,0.2)',
                                        backgroundColor: 'rgba(255,255,255,0.5)',
                                        backdropFilter: 'blur(10px)',
                                        padding: '0.25rem',
                                        boxShadow: 'none',
                                        '&:hover': {
                                            borderColor: 'rgba(99, 102, 241, 0.5)'
                                        }
                                    }),
                                    multiValue: (base) => ({
                                        ...base,
                                        backgroundColor: 'rgba(99, 102, 241, 0.1)',
                                        borderRadius: '0.5rem',
                                    }),
                                    multiValueLabel: (base) => ({
                                        ...base,
                                        color: '#4f46e5',
                                        fontWeight: 600,
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        borderRadius: '1rem',
                                        overflow: 'hidden',
                                        backdropFilter: 'blur(10px)',
                                        backgroundColor: 'rgba(255,255,255,0.9)'
                                    })
                                }}
                            />
                        </div>
                        
                    </div>

                </div>

                <motion.div 
                    layout
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                                key={project.id}
                            >
                                <Link to={`/project/${project.id}`} className="group block h-full">
                                    <div className="h-full bg-glass-surface backdrop-blur-md border border-glass-border rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group-hover:-translate-y-2">
                                        
                                        {/* Image Container */}
                                        <div className="h-48 overflow-hidden relative">
                                            <div className="absolute inset-0 bg-indigo-900/10 group-hover:bg-indigo-900/0 transition-colors z-10 w-full h-full"></div>
                                            <img 
                                                src={project.image} 
                                                alt={project.title} 
                                                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="p-6 flex-1 flex flex-col">
                                            <h3 className="font-display text-2xl text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">
                                                {project.title}
                                            </h3>
                                            <p className="font-body text-slate-600 mb-4 line-clamp-3 flex-1">
                                                {project.description}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-2 mt-auto">
                                                {project.tags.slice(0, 3).map(tag => (
                                                    <span key={tag} className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags.length > 3 && (
                                                    <span className="text-xs text-slate-400 py-1">+ {project.tags.length - 3}</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
                
                {filteredProjects.length === 0 && (
                    <div className="text-center py-20">
                        <p className="font-display text-2xl text-slate-400">Aucun projet ne correspond à ces critères.</p>
                    </div>
                )}
            </div>
        </section>
    );
}
