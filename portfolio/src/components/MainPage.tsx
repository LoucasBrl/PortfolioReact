import DonutScene from './Scenes/DonutScene'
import { motion } from 'framer-motion'

function MainPage() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  }

  return (
    <section id="mainpage" className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#f5f2f0] to-[#e3dedb] py-20 px-4">
      
      {/* 3D Scene Background */}
      <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
         <DonutScene />
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center justify-center h-full gap-12"
      >
        
        {/* Hero Title */}
        <div className="text-center relative z-20 w-full flex flex-col items-center justify-center">
          <motion.h1 
            variants={item}
            className="font-display text-[clamp(8rem,30vw,30rem)] leading-[0.7] text-[#10232A] tracking-tight mix-blend-overlay opacity-90 select-none"
          >
            LOUCAS
          </motion.h1>
          <motion.h2 
            variants={item}
            className="font-body font-black italic text-[clamp(3rem,12vw,12rem)] leading-none text-[#3D4D55]/90 absolute top-[70%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-30 pointer-events-none"
          >
            BURELLIER
          </motion.h2>
        </div>

        {/* Floating Cards */}
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-stretch mt-12 md:mt-24">
          <motion.div 
            variants={item}
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex-1 max-w-md bg-white/30 backdrop-blur-xl border border-[#3D4D55]/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all"
          >
            <h3 className="font-display text-2xl text-[#10232A] mb-4">A propos</h3>
            <p className="font-body text-[#10232A]/80 text-lg leading-relaxed">
              Je m'appelle Loucas et l'informatique me passionne. Et si on apprenait à se connaitre ?
            </p>
          </motion.div>

          <motion.div 
            variants={item}
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex-1 max-w-md bg-white/30 backdrop-blur-xl border border-[#3D4D55]/20 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all"
          >
             <h3 className="font-display text-2xl text-[#10232A] mb-4">Actuellement</h3>
             <p className="font-body text-[#10232A]/80 text-lg leading-relaxed">
               Originaire des montagnes des hautes-alpes, Je suis actuellement étudiant à l'IUT2 de Grenoble en 2ème année de BUT Informatique.
             </p>
          </motion.div>
        </div>

      </motion.div>
      
      {/* Gradient Fade Divider */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none"></div>
    </section>
  )
}

export default MainPage
