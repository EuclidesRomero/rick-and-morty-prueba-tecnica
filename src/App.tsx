import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './layouts/Layout';
import { RickAndMortyProvider } from './context/RickAndMortyContext';
import Locations from './components/locations';
import Episodes from './components/Episodes';

function App() {
  return (
    <BrowserRouter>
      <RickAndMortyProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route  path='/characters' element={<Home />} />
            <Route  path='/locations' element={<Locations />} />
            <Route  path='/episodes' element={<Episodes />} />
          </Route>
        </Routes>
      </RickAndMortyProvider>
    </BrowserRouter>
  );
}

export default App;
