import { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modal';
import './ImageGalleryItem.css';

export default function ImageGalleryItem({ item }) {
  const [shownModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(shownModal => !shownModal);
  };

  return (
    <li className="ImageGalleryItem">
      <img
        onClick={toggleModal}
        className="ImageGalleryItem-image"
        src={item.webformatURL}
        alt={item.user}
      />
      {shownModal && <Modal onClose={toggleModal} image={item} />}
    </li>
  );
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    user: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
  }),
};
