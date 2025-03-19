import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './layouts/Layout';
import { RickAndMortyProvider } from './context/RickAndMortyContext';

function App() {
  return (
    <BrowserRouter>
      <RickAndMortyProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </RickAndMortyProvider>
    </BrowserRouter>
  );
}

export default App;
