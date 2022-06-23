import PropTypes from 'prop-types';

import { ModalWin, Overlay } from './Modal.styled';

import { createPortal } from 'react-dom';
import { useEffect } from 'react';

const modalRoot = document.querySelector('#modal__root');

export const Modal = ({ onClose, onOpen }) => {
  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  });

  const onKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handleClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };

  const { id, largeImageURL } = onOpen;

  return createPortal(
    <Overlay onClick={handleClick}>
      <ModalWin>
        <img src={largeImageURL} alt={id} />
      </ModalWin>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  onOpen: PropTypes.shape({
    id: PropTypes.number.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),
};
