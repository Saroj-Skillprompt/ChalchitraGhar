import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateMovieMutation,
  useUploadImageMutation,
} from "../../redux/api/movies";
import { useFetchGenresQuery } from "../../redux/api/genre";
import { toast } from "react-toastify";

const CreateMovie = () => {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: "",
    year: 0,
    detail: "",
    cast: [],
    rating: 0,
    image: null,
    genre: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [
    createMovie,
    { isLoading: isCreatingMovie, error: createMovieErrorDetail },
  ] = useCreateMovieMutation();

  const [
    uploadImage,
    { isLoading: isUploadingImage, error: uploadImageErrorDetails },
  ] = useUploadImageMutation();

  const { data: genres, isLoading: isLoadingGenres } = useFetchGenresQuery();

  useEffect(() => {
    if (genres && genres.length > 0) {
      setMovieData((prevData) => ({
        ...prevData,
        genre: genres[0]?._id || "",
      }));
    }
  }, [genres]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleCreateMovie = async () => {
    try {
      if (
        !movieData.name ||
        !movieData.year ||
        !movieData.detail ||
        !movieData.cast.length ||  // fixed here
        !selectedImage
      ) {
        toast.error("Please fill all required fields");
        return;
      }

      let uploadedImagePath = null;

      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        const uploadImageResponse = await uploadImage(formData);

        if (uploadImageResponse.data) {
          uploadedImagePath = uploadImageResponse.data.image;
        } else {
          console.error("Failed to upload image: ", uploadImageErrorDetails);
          toast.error("Failed to upload image");
          return;
        }

        await createMovie({
          ...movieData,
          image: uploadedImagePath,
        });

        toast.success("Movie Added To Database");

        setMovieData({
          name: "",
          year: 0,
          detail: "",
          cast: [],
          rating: 0, // fixed typo from "ratings"
          image: null,
          genre: genres && genres.length > 0 ? genres[0]._id : "",
        });

        setSelectedImage(null);

        navigate("/admin/movies-list");
      }
    } catch (error) {
      console.error("Failed to create movie: ", createMovieErrorDetail);
      toast.error(`Failed to create movie: ${createMovieErrorDetail?.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0f0f] via-[#1a1a1a] to-[#2c2c2c] p-4">
      <form className="w-full max-w-3xl bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 text-white">
        <h2 className="text-3xl font-bold mb-6 text-teal-300 text-center">
          🎬 Add New Movie
        </h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1">Movie Name</label>
          <input
            type="text"
            name="name"
            value={movieData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            placeholder="e.g., Jaari"
          />
        </div>

        {/* Year */}
        <div className="mb-4">
          <label className="block mb-1">Release Year</label>
          <input
            type="number"
            name="year"
            value={movieData.year}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            placeholder="e.g., 2023"
          />
        </div>

        {/* Detail */}
        <div className="mb-4">
          <label className="block mb-1">Description</label>
          <textarea
            name="detail"
            value={movieData.detail}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400 transition resize-none"
            placeholder="Short movie description..."
          ></textarea>
        </div>

        {/* Cast */}
        <div className="mb-4">
          <label className="block mb-1">Cast (comma-separated)</label>
          <input
            type="text"
            name="cast"
            value={movieData.cast.join(", ")}
            onChange={(e) =>
              setMovieData({ ...movieData, cast: e.target.value.split(", ") })
            }
            className="w-full px-4 py-2 rounded-lg bg-white/10 text-white placeholder-gray-400 border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
            placeholder="e.g., Dayahang Rai, Miruna Magar"
          />
        </div>

        {/* Genre */}
        <div className="mb-4">
          <label className="block mb-1">Genre</label>
          <select
            name="genre"
            value={movieData.genre}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg bg-white text-black border border-white/20 focus:outline-none focus:ring-2 focus:ring-teal-400 transition"
          >
            {isLoadingGenres ? (
              <option>Loading genres...</option>
            ) : (
              genres?.map((genre) => (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              ))
            )}
          </select>
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label className="block mb-2">
            {selectedImage ? "Selected Image:" : "Upload Poster Image"}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-white file:cursor-pointer file:rounded-lg file:px-4 file:py-2 file:bg-teal-500 file:text-white hover:file:bg-teal-600 transition"
          />
        </div>

        {/* Button */}
        <button
          type="button"
          onClick={handleCreateMovie}
          disabled={isCreatingMovie || isUploadingImage}
          className={`w-full py-3 rounded-lg font-semibold text-white transition ${
            isCreatingMovie || isUploadingImage
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600"
          }`}
        >
          {isCreatingMovie || isUploadingImage ? "Uploading..." : "Create Movie 🎥"}
        </button>
      </form>
    </div>
  );
};

export default CreateMovie;
