// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { AccordionOptimization } from './Pages/ReactTSPractice/AccordionOptimizationApp/Page/AccordionOptimization';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/accordion" element={<AccordionOptimization />} />
    </Routes>
  )
}

export default App