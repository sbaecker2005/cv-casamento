import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
// Ajustar imports conforme estrutura (Rsvp, Pix) se existirem
import Rsvp from './routes/Rsvp';
import Pix from './routes/Pix';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rsvp" element={<Rsvp />} />
      <Route path="/pix" element={<Pix />} />
    </Routes>
  );
}

export default App;

