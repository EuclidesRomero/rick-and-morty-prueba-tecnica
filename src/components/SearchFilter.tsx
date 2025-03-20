import { FiFilter } from "react-icons/fi";
import useRickAndMorty from "../hooks/useRickAndMorty";
import { useState } from "react";
import SearchInput from "./SearchInput";
import FilterSelects from "./FilterDesktop";

const SearchFilter = () => {
  const {
    openFilter,
    setOpenFilter,
    getCharacter,
    setName
  } = useRickAndMorty();

  const [specie, setSpecie] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  const filter = () => {
    getCharacter(specie, gender, status);
    setOpenFilter(!openFilter)
  }


  const speciesList = [
    "Human", "Alien", "Humanoid", "Poopybutthole", "Mythological Creature",
    "Animal", "Robot", "Cronenberg", "Disease", "Parasite", "Vampire", "Unknown"
  ];

  return (
    <>
      <div className="w-full flex flex-col h-[200px] mt-10 lg:flex lg:justify-center lg:items-center  ">
        <div className="h-20 lg:w-2/5">
          <div>
          <SearchInput
            placeholder="Filter by name..."
            onChange={setName}
          />
          </div>
        </div>
        <button onClick={() => setOpenFilter(!openFilter)} className="flex items-center justify-center space-x-2 w-full py-2 rounded-md bg-blue-100 text-blue-600 font-semibold hover:bg-blue-200 transition mt lg:hidden">
          <FiFilter className="text-lg" />
          <span>ADVANCED FILTERS</span>
        </button>
        <div className="hidden md:block">
          <FilterSelects />
        </div>
        <div
          className={`md:hidden ${!openFilter ? "hidden" : "block"} fixed top-30 left-5 z-50 bg-white h-80 w-80 shadow-lg`}
        >
          <header className="flex justify-between">
            <div className="w-2/5">
              <p className="text-lg">Filters</p>
            </div>
            <div className="w-2/5 flex justify-end">
              <button onClick={() => setOpenFilter(!openFilter)} className="mr-5 text-lg">x</button>
            </div>
          </header>
          <div className="flex flex-col items-center justify-center gap-y-4 mt-5">
            <select onChange={(e) => setSpecie(e.target.value)} className="px-4 py-2 border rounded-lg w-60 border-gray-300">
              <option value="">Species</option>
              {speciesList.map(sp => (
                <option key={sp} value={sp}>{sp}</option>
              ))}
            </select>
            <select onChange={(e) => setGender(e.target.value)} className="px-4 py-2 border rounded-lg w-60 border-gray-300">
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Genderless">Genderless</option>
              <option value="Unknown">Unknown</option>
            </select>
            <select onChange={(e) => setStatus(e.target.value)} className="px-4 py-2 border rounded-lg w-60 border-gray-300">
              <option value="">Status</option>
              <option value="Alive">Alive</option>
              <option value="Dead">Dead</option>
              <option value="Unknown">Unknown</option>
            </select>
            <button className="text-[rgb(45,154,245)] w-60 h-8 rounded-lg rou border " onClick={() => filter()}>Apply</button>
          </div>
        </div>

      </div>

    </>
  );
};

export default SearchFilter;
