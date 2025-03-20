import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRickAndMorty from "../hooks/useRickAndMorty";
import Character from "../interfaces/types/Chararter";
import { Episode } from "../interfaces/types/Episode";
import EpisodeCard from "./EpisodeCard";

const CharacterDetails = () => {
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();
    const { getASingleCharacter } = useRickAndMorty();
    const [character, setCharacter] = useState<Character | null>(null);
    const [episodes, setEpisodes] = useState<Episode[]>([])



    const episodeIds = character?.episode
        .map((url) => url.split("/").pop())
        .filter((id) => id && !isNaN(Number(id)))
        .join(",");


    useEffect(() => {
        const handledInfo = async () => {
            if (!id) return;
            const response = await getASingleCharacter(parseInt(id));
            setCharacter(response);
        };
        handledInfo();
    }, [id, getASingleCharacter]);

    useEffect(() => {
        const fetchEpisodes = async () => {
            if (!episodeIds) return;

            try {
                const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodeIds}`);
                const data = await response.json();
                console.log("Episodes", data);
                setEpisodes(Array.isArray(data) ? data : [data]);
            } catch (error) {
                console.error("Error fetching episodes:", error);
            }
        };

        fetchEpisodes();
    }, [character]);



    if (!character) return <p>Loading...</p>;

    return (
        <div className="w-full p-4">
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-4 hover:cursor-pointer">
                &larr; Go Back
            </button>

            <div className="flex flex-col items-center lg:h-52">
                <img
                    src={character.image}
                    alt={character.name}
                    className="w-24 h-24 rounded-full border-4 border-gray-300 lg:size-44"
                />
                <h1 className="text-xl font-bold mt-2">{character.name}</h1>
            </div>

            <div className="lg:flex lg:justify-center lg:h-full  ">
                <div className="mt-4  flex flex-col lg:items-start lg:w-2/5 ">
                    <h2 className="text-lg font-semibold">Informations</h2>
                    <div className="mt-2 space-y-2 flex flex-col items-start lg:gap-10">
                        <p><strong>Gender:</strong> {character.gender}</p>
                        <p><strong>Status:</strong> {character.status}</p>
                        <p><strong>Specie:</strong> {character.species}</p>
                        <p><strong>Origin:</strong> {character.origin?.name}</p>
                        <p><strong>Type:</strong> {character.type || "Unknown"}</p>
                        <p><strong>Location:</strong> {character.location?.name}</p>
                    </div>
                </div>
                <div className="mt-4 flex flex-col lg:items-center items-start lg:w-2/5 ">
                    <h2 className="text-lg font-semibold">Episodes</h2>
                    <ul className="mt-2 space-y-2">
                        {episodes.map((ep) => (
                            <EpisodeCard key={ep.id} air_date={ep.air_date} episode={ep.episode} name={ep.name} justificado="start" />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CharacterDetails;
