import axios from "axios";

const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

const NEWS_API_URL = "https://newsapi.org/v2/";
const GUARDIAN_API_URL = "https://content.guardianapis.com/";
const NYT_API_URL = "https://api.nytimes.com/svc/search/v2/";

export const fetchNewsFromNewsAPI = async (query: string) => {
  try {
    const response = await axios.get(`${NEWS_API_URL}everything`, {
      params: { q: query, apiKey: NEWS_API_KEY },
    });
    // console.log(response);
    return response.data.articles;
  } catch (error) {
    console.error("Error fetching news from NewsAPI:", error);
    return [];
  }
};

export const fetchNewsFromGuardian = async (query: string) => {
  const response = await axios.get(`${GUARDIAN_API_URL}search`, {
    params: { q: query, "api-key": GUARDIAN_API_KEY, "show-fields": "all" },
  });
  //   console.log(response);
  return response.data.response.results;
};

export const fetchNewsFromNYT = async (query: string) => {
  const response = await axios.get(`${NYT_API_URL}articlesearch.json`, {
    params: { q: query, "api-key": NYT_API_KEY },
  });
  //   console.log(response);

  return response.data.response.docs;
};
