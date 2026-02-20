import Timeline from './Timeline'

function ParcoursPage() {
  return (
    <section id="parcourspage" className="relative min-h-screen w-full flex flex-col items-center py-24 bg-gradient-to-b from-white to-[#d8cfc9]/30">
      
      <div className="z-10 w-full flex flex-col items-center">
        <h2 
          className="text-[clamp(3rem,8vw,6rem)] text-transparent bg-clip-text bg-gradient-to-r from-[#10232A] to-[#3D4D55] mb-12 text-center leading-none"
          style={{ fontFamily: "'Vina Sans', sans-serif" }}
        >
          MON PARCOURS
        </h2>
        
        <Timeline />
      </div>
    </section>
  )
}

export default ParcoursPage
