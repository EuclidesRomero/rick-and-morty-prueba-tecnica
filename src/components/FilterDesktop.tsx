import { useState, useEffect } from "react";
import useRickAndMorty from "../hooks/useRickAndMorty";

const FilterSelects = () => {
  const [specie, setSpecie] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  
  const { getCharacter } = useRickAndMorty();

  useEffect(() => {
    getCharacter(specie, gender, status);
  }, [specie, gender, status]);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <select
        value={specie}
        onChange={(e) => setSpecie(e.target.value)}
        className="px-4 py-2 border rounded-lg w-60 border-gray-300"
      >
        <option value="">Species</option>
        {["Human", "Alien", "Humanoid", "Poopybutthole", "Mythological Creature", "Animal", "Robot", "Cronenberg", "Disease", "Parasite", "Vampire", "Unknown"].map(sp => (
          <option key={sp} value={sp}>{sp}</option>
        ))}
      </select>

      <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
        className="px-4 py-2 border rounded-lg w-60 border-gray-300"
      >
        <option value="">Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Genderless">Genderless</option>
        <option value="Unknown">Unknown</option>
      </select>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="px-4 py-2 border rounded-lg w-60 border-gray-300"
      >
        <option value="">Status</option>
        <option value="Alive">Alive</option>
        <option value="Dead">Dead</option>
        <option value="Unknown">Unknown</option>
      </select>
    </div>
  );
};

export default FilterSelects;