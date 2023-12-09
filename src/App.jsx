// eslint-disable-next-line no-unused-vars
import axios from "axios"; // import axios library for fetching api data
import { useCallback, useEffect, useRef, useState } from "react"; // import necessary react hooks
import { Form, Button } from "react-bootstrap"; // import react bootstrap form and button component
import ImageModal from "./components/ImageModal";

const API_URL = "https://api.unsplash.com/search/photos"; // unsplash_api_url
const IMAGES_PER_PAGE = 20; // Number of images to be shown

// logic of unsplash_image_search_app
const App = () => {
  const searchInput = useRef(null); // declaring useRef hook to access search input field

  // Define state variables to store images, total pages, current page, loading
  const [images, setImages] = useState([]);
  const [totalpages, setTotalpages] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // Define a function to fetch images from the Unsplash API
  const fetchImages = useCallback(async () => {
    try {
      if (searchInput.current.value) {
        setErrorMsg("");
        setLoading(true);
        const { data } = await axios.get(
          `${API_URL}?query=${
            searchInput.current.value
          }&page=${page}&per_page=${IMAGES_PER_PAGE}&client_id=${
            import.meta.env.VITE_API_KEY
          }`
        );
        setImages(data.results);
        setTotalpages(data.total_pages);
        setLoading(false);
      }
    } catch (error) {
      setErrorMsg("Error fetching images.Try again later");
      console.log(error);
      setLoading(false);
    }
  }, [page]);

  // Use useEffect to trigger image fetching when the component mounts or when the fetchImages function reference changes
  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // Define a function to reset the search and fetch new images
  const resetSearch = () => {
    setPage(1);
    fetchImages();
  };

  // Define a function to handle the search form submission
  const handleSearch = (e) => {
    e.preventDefault();
    resetSearch();
  };
  // Define a function to handle the selection of predefined search terms
  const handleSelection = (Selection) => {
    searchInput.current.value = Selection;
    resetSearch();
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setShowModal(false);
  };
  console.log("page", page);

  return (
    <>
      <div className="container">
        <h1 className="title text-center fw-bold ">Picture Gallery</h1>
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
        <div className="search-section text-center  m-auto">
          <Form onSubmit={handleSearch} className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search any image you want..."
              className="search-input"
              ref={searchInput}
            />
            <Button className="btn-style">Search</Button>
          </Form>
        </div>
        <div className="filters w-50 m-auto my-4">
          <div className="row filter ">
            <button
              className="col category-btn"
              onClick={() => handleSelection("food")}
            >
              Food
            </button>
            <button
          
              className="col category-btn"
              onClick={() => handleSelection("Landscape")}
            >
              Landscape
            </button>
            <button
              className=" col category-btn"
              onClick={() => handleSelection("cats")}
            >
              Cats
            </button>
            <button
              className="col category-btn"
              onClick={() => handleSelection("shoes")}
            >
              Shoes
            </button>
          </div>
        </div>

        {loading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            <div className="container my-5 text-center">
              <div className="images  row-cols-1 row-cols-sm-2 row-cols-md-4 ">
                {images.map((image) => (
                  
                  <img
                    key={image.id}
                    src={image.urls.small}
                    alt={image.alt_description}
                    className="image col border rounded-3 gx-2 "
                    onClick={() => openModal(image)} // open the modal with the clicked image
                    style={{ minWidth: "200px", height: "200px" }}
                  />
                ))}
              </div>
            </div>
            {/* Pagination buttons */}
            <div className="buttons text-center mb-4 ">
              {page > 1 && (
                <Button
                  className=" btn-style mx-3 button"
                  onClick={() => setPage(page - 1)}
                >
                  Previous
                </Button>
              )}{" "}
              {/* Show the Previous button only if the value of page is greater than 1 */}
              {page < totalpages && (
                <Button
                  className=" btn-style mx-3 button"
                  onClick={() => setPage(page + 1)}
                >
                  Next
                </Button>
              )}{" "}
              {/* show next button only if the current value of page is less than totalPages */}
            </div>
            <ImageModal
              showModal={showModal}
              onClose={closeModal}
              image={selectedImage}
              description={selectedImage ? selectedImage.description : ""}
              author={selectedImage ? selectedImage.user.name: ""}
              link={selectedImage ? selectedImage.urls.regular:""}
            
            />
          </>
        )}
      </div>
    </>
  );
};

export default App;
