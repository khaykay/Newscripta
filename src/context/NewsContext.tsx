import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  fetchNewsFromNewsAPI,
  fetchNewsFromGuardian,
  fetchNewsFromNYT,
} from "../services/api";

interface NewsContextType {
  news: any[];
  fetchNews: (query: string) => void;
  fetchDefaultNews: () => void;
  selectedSources: string[];
  setSelectedSources: (sources: string[]) => void;
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  selectedAuthors: string[];
  setSelectedAuthors: (authors: string[]) => void;
  savedSources: string[];
  setSavedSources: (sources: string[]) => void;
  savedCategories: string[];
  setSavedCategories: (categories: string[]) => void;
  savedAuthors: string[];
  setSavedAuthors: (authors: string[]) => void;
  filteredNews: any[];
  applyFilters: () => void;
  loading: boolean;
  resetFilters: () => void;
  editorsPick: any[];
  sportsNews: any[];
  businessNews: any[];
  foodNews: any[];
  query: string;
  setQuery: any;
  handlePreferenceUpdate: (
    selectedCategories: string[],
    selectedSources: string[],
    selectedAuthors: string[]
  ) => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [news, setNews] = useState<any[]>([]);
  const [filteredNews, setFilteredNews] = useState<any[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [savedSources, setSavedSources] = useState<string[]>(
    JSON.parse(localStorage.getItem("savedSources") || "[]")
  );
  const [savedCategories, setSavedCategories] = useState<string[]>(
    JSON.parse(localStorage.getItem("savedCategories") || "[]")
  );
  const [savedAuthors, setSavedAuthors] = useState<string[]>(
    JSON.parse(localStorage.getItem("savedAuthors") || "[]")
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [editorsPick, setEditorsPick] = useState<any[]>([]);
  const [sportsNews, setSportsNews] = useState<any[]>([]);
  const [businessNews, setBusinessNews] = useState<any[]>([]);
  const [foodNews, setFoodNews] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");

  const fetchDefaultNews = async () => {
    try {
      setLoading(true);

      // Check if user has selected categories, otherwise use defaults
      const categoriesToFetch =
        savedCategories.length > 0
          ? savedCategories
          : ["top headlines", "fashion", "sports", "business", "food"];

      const fetchPromises = [
        fetchNewsFromNewsAPI("top headlines"),
        fetchNewsFromGuardian("top headlines"),
        fetchNewsFromNYT("top headlines"),
        ...categoriesToFetch.map((category) => fetchNewsFromGuardian(category)),
      ];

      const results = await Promise.all(fetchPromises);

      const limitedNews = [
        ...results[0].slice(0, 1), // NewsAPI
        ...results[1].slice(0, 3), // Guardian
        ...results[2].slice(0, 3), // NYT
      ];

      setNews(limitedNews);
      setEditorsPick(results[3]?.slice(0, 5) || []);
      setSportsNews(results[4]?.slice(0, 5) || []);
      setBusinessNews(results[5]?.slice(0, 5) || []);
      setFoodNews(results[6]?.slice(0, 5) || []);
    } catch (error) {
      console.error("Error fetching default news:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchNews = async (query: string) => {
    setLoading(true);
    try {
      const [newsAPI, guardian, nyt] = await Promise.all([
        fetchNewsFromNewsAPI(query),
        fetchNewsFromGuardian(query),
        fetchNewsFromNYT(query),
      ]);

      const combinedNews = [
        ...newsAPI.slice(0, 10),
        ...guardian.slice(0, 10),
        ...nyt.slice(0, 10),
      ];

      if (query === "top headlines") {
        setSelectedSources([]);
        setSelectedCategories([]);
        setSelectedAuthors([]);
        fetchDefaultNews(); // Restore sections when going back to home
      } else {
        setNews(combinedNews);
        setFilteredNews(combinedNews);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = news;

    if (selectedSources.length > 0) {
      filtered = filtered.filter((article) => {
        const sourceName =
          article.source?.name?.toLowerCase() ||
          article.publication?.toLowerCase() ||
          article?.fields?.publication?.toLowerCase() ||
          "unknown";
        return selectedSources.some(
          (selected) => selected.toLowerCase() === sourceName
        );
      });
    }

   if (selectedCategories.length > 0) {
     filtered = filtered.filter((article) => {
       const categoryName = (
         article.pillarName ||
         article.section_name ||
         article.category ||
         "general"
       ).toLowerCase();

       return selectedCategories.some(
         (selected) => selected.toLowerCase() === categoryName
       );
     });
   }


    if (selectedAuthors.length > 0) {
      filtered = filtered.filter((article) => {
        const authorName =
          article.author?.toLowerCase() ||
          article.byline?.original?.toLowerCase() ||
          article?.fields?.byline.toLowerCase() ||
          "unknown author";
        return selectedAuthors.some(
          (selected) => selected.toLowerCase() === authorName
        );
      });
    }

    setFilteredNews(filtered);
  };

  const resetFilters = () => {
    setSelectedSources([]);
    setSelectedCategories([]);
    setSelectedAuthors([]);
    setFilteredNews(news); // Reset filtered news to the full news list
  };

const handlePreferenceUpdate = (
  selectedCategories: string[],
  selectedSources: string[],
  selectedAuthors: string[]
) => {
  setSavedCategories(selectedCategories);
  setSavedSources(selectedSources);
  setSavedAuthors(selectedAuthors);

  localStorage.setItem("savedCategories", JSON.stringify(selectedCategories));
  localStorage.setItem("savedSources", JSON.stringify(selectedSources));
  localStorage.setItem("savedAuthors", JSON.stringify(selectedAuthors));

  fetchDefaultNews(); // ✅ Re-fetch news when any preference updates
};


  useEffect(() => {
    fetchDefaultNews();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [selectedSources, selectedCategories, selectedAuthors, news]);

  // useEffect(() => {
  //   fetchDefaultNews();
  // }, [savedCategories, savedSources]); // Re-fetch news when preferences change
  
  return (
    <NewsContext.Provider
      value={{
        news,
        fetchNews,
        fetchDefaultNews,
        selectedSources,
        setSelectedSources,
        selectedCategories,
        setSelectedCategories,
        selectedAuthors,
        setSelectedAuthors,
        savedSources,
        setSavedSources,
        savedCategories,
        setSavedCategories,
        savedAuthors,
        setSavedAuthors,
        filteredNews,
        applyFilters,
        loading,
        resetFilters,
        editorsPick,
        sportsNews,
        businessNews,
        foodNews,
        query,
        setQuery,
        handlePreferenceUpdate,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider");
  }
  return context;
};
