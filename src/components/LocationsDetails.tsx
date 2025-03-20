import { useParams, useNavigate } from "react-router-dom";
import useRickAndMorty from "../hooks/useRickAndMorty";
import { useEffect, useState } from "react";
import { LocationInterface } from "../interfaces/types/LocationsInterface";
import Character from "../interfaces/types/Chararter";
import CardCharacter from "./CardChararter";

const LocationsDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getASingleLocations } = useRickAndMorty();
    const [locations, setLocations] = useState<LocationInterface | null>(null);
    const [residentes, setResidentes] = useState<Character[]>([]);

    useEffect(() => {
        const handledInfo = async () => {
            if (!id) return;
            const response = await getASingleLocations(parseInt(id));
            setLocations(response);
        };
        handledInfo();
    }, [id]);

    useEffect(() => {
        if (!locations?.residents || locations.residents.length === 0) return;
        const characterIds = locations.residents
            .map((url) => url.split("/").pop())
            .filter((id) => id && !isNaN(Number(id)))
            .join(",");

        if (!characterIds) return;

        const fetchResidentes = async () => {
            try {
                const response = await fetch(`https://rickandmortyapi.com/api/character/${characterIds}`);
                const data = await response.json();
                setResidentes(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error("Error fetching residents:", error);
            }
        };

        fetchResidentes();
    }, [locations]); 

    return (
        <div className="flex flex-col min-h-screen w-full">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-4 mt-2 hover:cursor-pointer">
                &larr; Go Back
            </button>
            <header className="w-full">
                <span className="text-2xl font-semibold">{locations?.name}</span>
                <div className="flex justify-evenly mt-5">
                    <div className="w-2/5 flex flex-col">
                        <span className="font-bold">Type</span>
                        <span>{locations?.type}</span>
                    </div>
                    <div className="w-2/3 flex flex-col">
                        <span className="font-bold">Dimension</span>
                        <span>{locations?.dimension}</span>
                    </div>
                </div>
            </header>
            <main className="flex-grow flex flex-col items-center w-full">
                <span className="text-lg font-bold p-2 rounded-md">Residents</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {residentes.length > 0 ? (
                        residentes.map((residente) => (
                            <CardCharacter
                                key={residente.id}
                                name={residente.name}
                                species={residente.species}
                                image={residente.image}
                            />
                        ))
                    ) : (
                        <p className="text-gray-500">No residents found</p>
                    )}
                </div>
            </main>
        </div>
    );
};

export default LocationsDetails;
