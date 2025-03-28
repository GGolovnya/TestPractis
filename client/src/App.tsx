// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './Pages/HomePage';
import { AccordionOptimization } from './Pages/ReactTSPractice/AccordionOptimizationApp/Page/AccordionOptimization';
import { StyleReactExample } from './Pages/ReactTSPractice/StyleReactExample/Page/StyleReactExample';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/accordion" element={<AccordionOptimization />} />
      <Route path="/stylereactexample" element={<StyleReactExample />} />
    </Routes>
  )
}

export default App