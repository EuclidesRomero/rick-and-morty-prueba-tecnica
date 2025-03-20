import { useState } from 'react';
import SearchInput from './SearchInput';
import useRickAndMorty from '../hooks/useRickAndMorty';
import { FiFilter } from "react-icons/fi";

const SearchLocations = ({}) => {
    const {getLocation} = useRickAndMorty();

    const [type, setType] = useState<string>("");
    const [dimension, setDimension] = useState<string>("");
    const {
        openFilter,
        setOpenFilter,
        setName,
    } = useRickAndMorty();

  

    
    const locationTypes = [
        "Planet", "Cluster", "Space station", "Microverse", "TV", "Resort", "Fantasy town", "Dream", "Menagerie", "Woods", "Unknown"
    ];

    const locationDimensions = [
        "Dimension C-137", "Replacement Dimension", "Cronenberg Dimension", "Dimension 5-126", "Fantasy Dimension", "Toxic Dimension", "Unknown"
    ];



    const filter = () => {
        getLocation(type, dimension);
        setOpenFilter(!openFilter)
      }

    return (
        <div>
            <div className="w-full flex flex-col items-center ">
                <div className="">
                    <SearchInput placeholder="Filter by name..." onChange={setName} />
                </div>
                <button 
                    onClick={() => setOpenFilter(!openFilter)} 
                    className="lg:hidden flex items-center justify-center space-x-2 w-full py-2 rounded-md bg-blue-100 text-blue-600 font-semibold hover:bg-blue-200 transition">
                    <FiFilter className="text-lg" />
                    <span>ADVANCED FILTERS</span>
                </button>
                <div className={`${!openFilter ? "hidden" : "block"} fixed top-30 left-5 z-50 bg-white h-auto w-80 shadow-lg p-4`}>
                    <header className="flex justify-between">
                        <p className="text-lg">Filters</p>
                        <button onClick={() => setOpenFilter(!openFilter)} className="text-lg">x</button>
                    </header>
                    <div className="flex flex-col items-center gap-y-4 mt-5">
                        <select onChange={(e) => setType(e.target.value)} className="px-4 py-2 border rounded-lg w-60 border-gray-300">
                            <option value=""> Type</option>
                            {locationTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        <select onChange={(e) => setDimension(e.target.value)} className="px-4 py-2 border rounded-lg w-60 border-gray-300">
                            <option value=""> Dimension</option>
                            {locationDimensions.map(dimension => (
                                <option key={dimension} value={dimension}>{dimension}</option>
                            ))}
                        </select>
                        <button className="text-blue-600 w-60 h-8 rounded-lg border" onClick={() => filter()}>Apply</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchLocations;