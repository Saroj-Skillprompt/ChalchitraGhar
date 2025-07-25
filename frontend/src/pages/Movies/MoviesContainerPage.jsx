import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data } = useGetNewMoviesQuery();
  const { data: topMovies } = useGetTopMoviesQuery();
  const { data: genres } = useFetchGenresQuery();
  const { data: randomMovies } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre === selectedGenre
  );

  return (
    <div className="px-4 py-8 max-w-[1280px] mx-auto">
      {/* Genre Selector */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Browse by Genre</h2>
        <div className="flex overflow-x-auto gap-4 flex-wrap md:justify-start">
          <button
            className={`transition duration-300 ease-in-out px-4 py-2 rounded-full text-sm ${
              selectedGenre === null
                ? "bg-white text-black font-semibold"
                : "bg-gray-700 text-white hover:bg-gray-500"
            }`}
            onClick={() => handleGenreClick(null)}
          >
            All
          </button>

          {genres?.map((g) => (
            <button
              key={g._id}
              className={`transition duration-300 ease-in-out px-4 py-2 rounded-full text-sm ${
                selectedGenre === g._id
                  ? "bg-white text-black font-semibold"
                  : "bg-gray-700 text-white hover:bg-gray-500"
              }`}
              onClick={() => handleGenreClick(g._id)}
            >
              {g.name}
            </button>
          ))}
        </div>
      </div>

      {/* Movie Sections */}
      <section className="space-y-12">
        <div>
          <h1 className="text-xl font-semibold mb-4">Choose Movie</h1>
          <SliderUtil data={filteredMovies} />
        </div>
        {/* Random Picks */}
        <div>
          <h1 className="text-xl font-semibold mb-4">Choose For You</h1>
          <SliderUtil data={randomMovies} />
        </div>

        {/* Top Movies */}
        <div>
          <h1 className="text-xl font-semibold mb-4">Top Movies</h1>
          <SliderUtil data={topMovies} />
        </div>

        {/* Filtered Movies */}
      </section>
    </div>
  );
};

export default MoviesContainerPage;
