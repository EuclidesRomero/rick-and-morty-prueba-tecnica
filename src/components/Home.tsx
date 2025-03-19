import CardChararter from "./CardChararter";
import useRickAndMorty from "../hooks/useRickAndMorty";

const Home = () => {
  const { chartacters, setPage} = useRickAndMorty();
  const handleLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <div className='w-full -mt-10'>
      <section>
        {chartacters?.map(({ name, species, image, id }) => (
          <CardChararter key={id} name={name} species={species} image={image} />
        ))}
      </section>
      <footer className="mt-5">
        <button onClick={handleLoadMore} className="w-40 h-8 rounded-lg bg-white text-blue-300 font-semibold shadow-md hover:bg-gray-100 active:shadow-sm">
          LOAD MORE
        </button>

      </footer>
    </div>
  );
};

export default Home;
