import { useEffect, useState } from 'react';

import { AppContainer, AppTitle } from './App.styled';

import Searhbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { getImages } from '../services/Api';

export const App = () => {
  const [images, setImages] = useState([]);
  const [title, setTitle] = useState('');

  const [activePage, setActivePage] = useState(0);
  const [totalHits, setTotalHits] = useState(0);

  const [status, setStatus] = useState('idle');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);

  useEffect(() => {
    if (title !== '') {
      setStatus('pending');

      setImages([]);
      setActivePage(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title]);

  useEffect(() => {
    if (activePage !== 0) {
      setStatus('pending');
      fetchImages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  const fetchImages = async () => {
    try {
      const { hits, totalHits } = await getImages(title, activePage);

      if (hits.length === 0) {
        setStatus('idle');
      }

      setImages([...images, ...hits]);
      setStatus('resolved');
      setTotalHits(totalHits);
    } catch (error) {
      setStatus('rejected');
    } finally {
    }
  };

  const imageTitle = newTitle => {
    if (title !== newTitle) {
      setImages([]);
      setTitle(newTitle);
      setActivePage(1);
    }
  };

  const nextPage = () => {
    setActivePage(activePage + 1);
  };

  const showModalWindow = id => {
    const currentItem = images.find(item => item.id === id);

    setModalItem(currentItem);

    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <AppContainer>
      <Searhbar onSubmit={imageTitle} />
      {status === 'rejected' && (
        <AppTitle>Oop! Something went wrong! Try again later!</AppTitle>
      )}

      <ImageGallery images={images} onOpenModal={showModalWindow} />
      {status === 'idle' && (
        <AppTitle>Welcome to the world of images!</AppTitle>
      )}

      {status === 'pending' && <Loader />}
      {status === 'resolved' && images.length === 0 && (
        <AppTitle>Such '{title}' not found!</AppTitle>
      )}

      {status === 'resolved' && totalHits > activePage * 12 && (
        <Button nextPage={nextPage} />
      )}

      {isModalOpen && <Modal onOpen={modalItem} onClose={toggleModal} />}
    </AppContainer>
  );
};
