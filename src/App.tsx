import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Layout from './layouts/Layout';
import { RickAndMortyProvider } from './context/RickAndMortyContext';
import Episodes from './components/Episodes';
import Locations from './components/Locations';
import CharacterDetails from './components/CharacterDetails';
import EpisodioDetails from './components/EpisodioDetails';
import LocationsDetails from './components/LocationsDetails';

function App() {
  return (
    <BrowserRouter>
      <RickAndMortyProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route  path='/characters' element={<Home />} />
            <Route  path='/characters-details/:id' element={<CharacterDetails />} />
            <Route  path='/episodio-details/:id' element={<EpisodioDetails />} />
            <Route  path='/location-details/:id' element={<LocationsDetails />} />
            <Route  path='/locations' element={<Locations />} />
            <Route  path='/episodes' element={<Episodes />} />
          </Route>
        </Routes>
      </RickAndMortyProvider>
    </BrowserRouter>
  );
}

export default App;
