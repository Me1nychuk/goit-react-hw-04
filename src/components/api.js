import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
axios.defaults.headers.common["Authorization"] = "Client-ID LyoWrIy7suC6iwDtcAjvizXsEns1fb84fMdgvDbu6Ng";

export const fetchImages = async (query, page=1) => {
  const response = await axios.get(`/search/photos?query=${query}&page=${page}`);
  return response.data;
};