import CardChararter from "./CardChararter";
import useRickAndMorty from "../hooks/useRickAndMorty";
import SearchFilter from "./SearchFilter";
import LoadMoreButton from "./LoadMoreButton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const { chartacters, setPage } = useRickAndMorty();
  
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handledDetails = (id:number) => {
    console.log(id);
    navigate(`/characters-details/${id}`);
  };

  return (
    <div className="w-full md:w-full md:mx-auto md:mt-10 lg:-mt-10">
      <SearchFilter />
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full ">
        {chartacters?.map(({ name, species, image, id }) => (
          <CardChararter
            onClick={() => handledDetails(id)}
            key={id}
            name={name}
            species={species}
            image={image}
          />
        ))}
      </section>
      <footer className="mt-10 flex justify-center">
        <LoadMoreButton onClick={handleLoadMore} />
      </footer>
    </div>
  );
};

export default Home;