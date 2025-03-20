import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useRickAndMorty from "../hooks/useRickAndMorty";
import { Episode } from "../interfaces/types/Episode";
import Character from "../interfaces/types/Chararter";
import CardCharacter from "./CardChararter";

const EpisodioDetails = () => {
  const params = useParams();
  const { id } = params;
  const navigate = useNavigate();
  const { getASingleEpisode } = useRickAndMorty();
  const [episodio, setEpisodio] = useState<Episode | null>(null);
  const [cast, setCast] = useState<Character[] | null>(null);

  useEffect(() => {
    const handleInfoEpisodio = async () => {
      try {
        if (id) {
          const response = await getASingleEpisode(parseInt(id));
          setEpisodio(response);
        }
      } catch (error) {
        console.error("Error al obtener el episodio:", error);
      }
    };

    handleInfoEpisodio();
  }, [id]);

  const characterIds = episodio?.characters
    .map((url) => url.split("/").pop())
    .filter((id) => id && !isNaN(Number(id)))
    .join(",");

  console.log('characterIds', characterIds)

  useEffect(() => {
    const fetchCast = async () => {
      if (!characterIds) return;
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character/${characterIds}`);
        const data = await response.json();
        console.log("cast", data);
        setCast(data);
      } catch (error) {
        console.error("Error fetching episodes:", error);
      }
    };
    fetchCast();
  }, [episodio]);



  return (
    <div className="flex flex-col min-h-screen w-full">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 mb-4 mt-2 hover:cursor-pointer">
        &larr; Go Back
      </button>
      <header className="w-full">
        <span className="text-2xl font-semibold">{episodio?.name}</span>
        <div className="flex justify-evenly mt-5">
          <div className="w-2/5 flex flex-col ">
            <span className="font-bold">Episode</span>
            <span>{episodio?.episode}</span>
          </div>
          <div className="w-2/3 flex flex-col ">
            <span className="font-bold">Date</span>
            <span>{episodio?.air_date}</span>
          </div>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-start  w-full">
        <span className="text-lg font-bold p-2 rounded-md">CAST</span>
        <div className="grid grid-rows-6 gap-4 md:grid-cols-3 md:grid-rows-none lg:mt-6 hover:cursor-pointer justify-center items-center">
          {cast?.map((cast) => (
            <CardCharacter name={cast.name} species={cast.species} image={cast.image} />
          ))}
        </div>

      </main>

    </div>
  )
}

export default EpisodioDetails
