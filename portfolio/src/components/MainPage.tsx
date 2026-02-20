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
    <section id="mainpage" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-slate-100 to-indigo-50">
      
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
        <div className="text-center relative">
          <motion.h1 
            variants={item}
            className="font-display text-[clamp(4rem,15vw,16rem)] leading-none text-slate-900 tracking-tighter"
          >
            LOUCAS
          </motion.h1>
          <motion.h2 
            variants={item}
            className="font-body font-bold italic text-[clamp(2rem,6vw,6rem)] leading-none bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-600 absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full mix-blend-multiply"
          >
            BURELLIER
          </motion.h2>
        </div>

        {/* Floating Cards */}
        <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-stretch mt-12 md:mt-24">
          <motion.div 
            variants={item}
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex-1 max-w-md bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all"
          >
            <h3 className="font-display text-2xl text-indigo-900 mb-4">A propos</h3>
            <p className="font-body text-slate-700 text-lg leading-relaxed">
              Je m'appelle Loucas et l'informatique me passionne. Et si on apprenait à se connaitre ?
            </p>
          </motion.div>

          <motion.div 
            variants={item}
            whileHover={{ y: -5, scale: 1.02 }}
            className="flex-1 max-w-md bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all"
          >
             <h3 className="font-display text-2xl text-indigo-900 mb-4">Actuellement</h3>
             <p className="font-body text-slate-700 text-lg leading-relaxed">
               Originaire des montagnes des hautes-alpes, Je suis actuellement étudiant à l'IUT2 de Grenoble en 2ème année de BUT Informatique.
             </p>
          </motion.div>
        </div>

      </motion.div>
    </section>
  )
}

export default MainPage
