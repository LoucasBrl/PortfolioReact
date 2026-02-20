import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import ProjectPage from './components/ProjectPage.tsx'
import KnowledgeMap from './components/KnowledgeMap.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/project/:id" element={<ProjectPage />} />
        <Route path="/knowledge" element={<KnowledgeMap />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
