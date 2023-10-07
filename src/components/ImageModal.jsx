import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalFooter,
} from "react-bootstrap";

const ImageModal = ({ showModal, onClose, image, description }) => {
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
        <p className="fw-bold text-center mt-1">{description}</p>
      </ModalBody>
      <ModalFooter>
        <button
          className=" action-btns bg-info p-1 border-0 "
          onClick={handleDownload}
        >
          Download
        </button>
        <button
          className=" action-btns bg-info p-1  border-0"
          onClick={onClose}
        >
          Close
        </button>
      </ModalFooter>
    </Modal>
  );
};
export default ImageModal;
