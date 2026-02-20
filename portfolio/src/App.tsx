import MainPage from './components/MainPage'
import NavBar from './components/NavBar'
import ParcoursPage from './components/ParcoursPage'
import Browse from './components/Browse'
import Contact from './components/Contact'
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <div className="bg-slate-50 min-h-screen">
      <NavBar />
      <main>
        <MainPage />
        <ParcoursPage />
        <Browse />
        <Contact />
      </main>
      <SpeedInsights />
    </div>
  )
}

export default App
