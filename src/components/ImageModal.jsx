import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";

const ImageModal = ({ showModal, onClose, image, description,author,link }) => {
  if (!image) {
    return null; // render nothing if the image is null
  }

  // Function to handle the download button click
  const handleDownload = () => {
    // Create a link element
    const link = document.createElement("a");
    // Set the href attribute to the URL of the full-sized image
    link.href = image.urls.full;
    // Set the "download" attribute to prompt the user to download the image
    link.setAttribute("download", image.alt_description || "image.j[g");
    // Trigger a click event on the link to initiate the download
    link.click();
  };

  return (
    <Modal show={showModal} onHide={onClose} centered>
      <ModalHeader closeButton>
        <ModalTitle>Image Details</ModalTitle>
      </ModalHeader>
      <ModalBody>
        {/* Display the larger version of the image */}
        <img
          className=""
          src={image.urls.full}
          alt={image.alt_description}
          style={{ width: "100%", height: "500px" }}
        />
        <p className="fst-italic text-center mt-1">{description}</p>
        <div className="d-flex justify-content-between">
        <a href={link} target="blank">Original Image</a>
        <p className="fw-bold text-right">{`Author - ${author}`}</p>

        </div>
    
      </ModalBody>
      <ModalFooter>
        <button
          className="btn-style action-btns  p-2"
          onClick={handleDownload}
        >
          Download
        </button>
        <button
          className="btn-style action-btns  p-2"
          onClick={onClose}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};
export default ImageModal;
