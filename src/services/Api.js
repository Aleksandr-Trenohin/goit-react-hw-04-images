import axios from 'axios';

const API_KEY = '26745683-ec5771c1b459334d80ff30e1d';

axios.defaults.baseURL = 'https://pixabay.com/api';

export const getImages = async (title, activePage) => {
  const response = await axios.get(
    `/?q=${title}&page=${activePage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );

  return response.data;
};
