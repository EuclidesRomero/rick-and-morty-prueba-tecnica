import useRickAndMorty from "../hooks/useRickAndMorty";
import LoadMoreButton from "./LoadMoreButton";
import LocationCard from "./LocationCard";
import SearchLocations from "./SearchLocations";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Locations = () => {
  const navigate = useNavigate();
  const { locations, setPageLocation, getLocation} = useRickAndMorty();
  const [selectedType, setSelectedType] = useState("");
  const [selectedDimension, setSelectedDimension] = useState("");

  const handleLoadMore = () => {
    setPageLocation((prev) => prev + 1);
  };

  const handledDetails = (id: number) => {
    console.log(id);
    navigate(`/location-details/${id}`);
  };
  useEffect(()=>{
    getLocation(selectedType, selectedDimension )

  }, [selectedType,selectedDimension])

  const types = [
    "Planet", "Cluster", "Space station", "Microverse", "TV",
    "Resort", "Fantasy town", "Dream", "Menagerie", "Woods", "Unknown",
  ];

  const dimensiones = [
    "Dimension C-137", "Replacement Dimension", "Cronenberg Dimension",
    "Dimension 5-126", "Fantasy Dimension", "Toxic Dimension", "Unknown",
  ];

  return (
    <div className="w-full md:w-full md:mx-auto md:mt-10">
      <div className="lg:flex lg:justify-center">
        <div className="lg:w-full lg:justify-center">
          <div className="w-full h-20 lg:flex justify-center lg:items-center gap-4">
            <SearchLocations />

            <select
              className="hidden lg:block p-2 border rounded"
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              <option value=""> Types</option>
              {types.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>

            <select
              className="hidden lg:block p-2 border rounded"
              value={selectedDimension}
              onChange={(e) => setSelectedDimension(e.target.value)}
            >
              <option value="">Dimensions</option>
              {dimensiones.map((dimension) => (
                <option key={dimension} value={dimension}>{dimension}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="grid grid-rows-4 gap-4 md:grid-cols-4 md:grid-rows-none">
        {locations
          .filter((location) =>
            (selectedType ? location.type === selectedType : true) &&
            (selectedDimension ? location.dimension === selectedDimension : true)
          )
          .map((location) => (
            <LocationCard
              onClick={() => handledDetails(location.id)}
              key={location.id}
              name={location.name}
              type={location.type}
            />
          ))}
      </div>
      <LoadMoreButton onClick={handleLoadMore} />
    </div>
  );
};

export default Locations;
