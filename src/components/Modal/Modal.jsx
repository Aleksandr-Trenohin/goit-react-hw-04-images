import { Component } from 'react';
import PropTypes from 'prop-types';

import { ModalWin, Overlay } from './Modal.styled';

import { createPortal } from 'react-dom';

const modalRoot = document.querySelector('#modal__root');

export class Modal extends Component {
  static propTypes = {
    onClose: PropTypes.func.isRequired,
    onOpen: PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleClick = evt => {
    if (evt.currentTarget === evt.target) {
      this.props.onClose();
    }
  };

  render() {
    const { id, largeImageURL } = this.props.onOpen;

    return createPortal(
      <Overlay onClick={this.handleClick}>
        <ModalWin>
          <img src={largeImageURL} alt={id} />
        </ModalWin>
      </Overlay>,
      modalRoot
    );
  }
}
