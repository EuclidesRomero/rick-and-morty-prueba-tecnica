import useRickAndMorty from "../hooks/useRickAndMorty";
import EpisodeCard from "./EpisodeCard";
import LoadMoreButton from "./LoadMoreButton";
import SearchInput from "./SearchInput";
import { useNavigate } from "react-router-dom";


const Episodes = () => {
  const navigate = useNavigate()

  const { espisodes, setPageEpisodes, setEpisodioSearch } = useRickAndMorty(); 
  console.log(espisodes)

  const handleLoadMore = () => {
    setPageEpisodes((prev) => prev + 1);
  };

  const handledDetails = (id:number) => {
    console.log(id)
    navigate(`/episodio-details/${id}`)
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <div className="flex-grow flex flex-col ">
      <div className="w-full h-20 lg:flex justify-center lg:items-center gap-4">
        <div className="lg:w-2/5">
        <SearchInput placeholder="Name or episode (ex. S01E01)..." onChange={setEpisodioSearch} />
        </div>
      </div>
        
        <div className="grid grid-rows-4 gap-4 md:grid-cols-4 md:grid-rows-none lg:mt-6 hover:cursor-pointer">
        {espisodes?.length > 0 ? (
            espisodes.map((episode) => (
              <EpisodeCard
                onClick={() => handledDetails(episode.id)}
                key={episode.id}
                name={episode.name}
                air_date={episode.air_date}
                episode={episode.episode}
                justificado="center"
              />
            ))
          ) : (
            <p className="text-center text-gray-500 text-l h-1/3 flex justify-center items-center">Ya no hay más episodios por aquí.</p>
          )}
        </div>
        
        <div className="mt-auto flex justify-center py-4">
          <LoadMoreButton onClick={handleLoadMore} />
        </div>
      </div>
    </div>
  );
};

export default Episodes;
