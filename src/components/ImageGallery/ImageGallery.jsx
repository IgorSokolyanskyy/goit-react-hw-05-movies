import ImageGalleryItem from '../ImageGalleryItem';
import PropTypes from 'prop-types';
import './ImageGallery.css';

export default function ImageGallery({ items }) {
  return (
    <>
      <ul className="ImageGallery">
        {items.map(item => (
          <ImageGalleryItem key={item.id} item={item} />
        ))}
      </ul>
    </>
  );
}

ImageGallery.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
