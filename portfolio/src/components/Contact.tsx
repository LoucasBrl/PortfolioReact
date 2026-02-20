import ContactScene from "./Scenes/ContactScene";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';

export default function Contact() {
  const cards = [
    { icon: faPhone, title: "Appelez-moi", value: "07 66 25 52 05", href: "tel:+33766255205" },
    { icon: faEnvelope, title: "Email", value: "loucas.burellier@etu.univ-grenoble-alpes.fr", href: "mailto:loucas.burellier@etu.univ-grenoble-alpes.fr" },
    { icon: faLinkedin, title: "LinkedIn", value: "linkedin.com/in/loucas-burellier", href: "https://www.linkedin.com/in/loucas-burellier/" }
  ];

  return (
    <section id="contactpage" className="relative min-h-[80vh] w-full py-24 px-6 flex flex-col items-center justify-center bg-gradient-to-t from-slate-200 to-white overflow-hidden">
        
        {/* Background Scene */}
        <div className="absolute right-[-10%] bottom-[-20%] w-[60%] h-[80%] opacity-30 pointer-events-none z-0">
             <ContactScene />
        </div>

        <div className="z-10 w-full max-w-6xl flex flex-col items-center">
            <h2 
                className="text-[clamp(3rem,8vw,8rem)] text-slate-800 mb-16 text-center leading-none tracking-tighter"
                style={{ fontFamily: "'Vina Sans', sans-serif" }}
            >
                ME CONTACTER
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full z-10">
                {cards.map((card, index) => (
                    <motion.a 
                        key={index}
                        href={card.href}
                        target={card.icon === faLinkedin ? "_blank" : undefined}
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-3xl p-8 flex flex-col items-center text-center shadow-lg hover:shadow-2xl hover:bg-white/80 transition-all group cursor-pointer block"
                    >
                        <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-colors mx-auto">
                            <FontAwesomeIcon icon={card.icon} />
                        </div>
                        <h3 className="font-display text-2xl text-slate-800 mb-2">{card.title}</h3>
                        <p className="font-body text-slate-500 text-lg break-all">{card.value}</p>
                    </motion.a>
                ))}
            </div>
            
            <footer className="mt-24 text-slate-400 font-body text-sm">
                © 2026 Loucas Burellier. Tous droits réservés.
            </footer>
        </div>
    </section>
  );
}
