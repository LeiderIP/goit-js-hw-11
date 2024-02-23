import axios from 'axios';
import Notiflix from 'notiflix';

const API_KEY = '42456544-e55c7a4295ba52a4d79edc728';
const BASE_URL = 'https://pixabay.com/api/?';

export default class newApiService {
  constructor() {
    this.q = '';
    this.page = 1;
    this.data = [];
  }
  async fetchimages(q) {
    this.q = q;
    let params = new URLSearchParams({
      q: this.q,
      page: this.page,
      // constants
      key: API_KEY,
      per_page: 40,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    });
    try {
      let response = await axios.get(BASE_URL + params);
      this.data = response.data.hits;
      if (this.data.length === 0) {
        throw new Error('Images not found');
      }
      Notiflix.Notify.success('Ok', 'images Loaded', 'Close', {
        width: '360px',
        svgSize: '120px',
      });
      return this.data;
    } catch (error) {
      Notiflix.Notify.failure('Not ok', error.message, 'Close', {
        width: '360px',
        svgSize: '120px',
      });
      return [];
    }
  }

  async fetchMore() {
    this.page += 1;
    let data = await this.fetchimages(this.q);
    return data;
  }
}
