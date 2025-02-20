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
  filteredNews: any[];
  applyFilters: () => void;
  loading: boolean;
  resetFilters: () => void;
  editorsPick: any[];
  sportsNews: any[];
  businessNews: any[];
  foodNews: any[];
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider = ({ children }: { children: ReactNode }) => {
  const [news, setNews] = useState<any[]>([]);
  const [filteredNews, setFilteredNews] = useState<any[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [editorsPick, setEditorsPick] = useState<any[]>([]);
  const [sportsNews, setSportsNews] = useState<any[]>([]);
  const [businessNews, setBusinessNews] = useState<any[]>([]);
  const [foodNews, setFoodNews] = useState<any[]>([]);

  const fetchDefaultNews = async () => {
    try {
      setLoading(true);

      const [newsAPI, guardian, nyt, fashion, sports, business, food] =
        await Promise.all([
          fetchNewsFromNewsAPI("top headlines"),
          fetchNewsFromGuardian("top headlines"),
          fetchNewsFromNYT("top headlines"),
          fetchNewsFromNewsAPI("fashion"), // Editor's Pick
          fetchNewsFromNewsAPI("sports"),
          fetchNewsFromNewsAPI("business"),
          fetchNewsFromNewsAPI("food"),
        ]);

      const limitedNews = [
        ...newsAPI.slice(0, 2),
        ...guardian.slice(0, 2),
        ...nyt.slice(0, 2),
      ];

      setNews(limitedNews);
      //   setEditorsPick(fashion.slice(0, 5));
      //   setSportsNews(sports.slice(0, 5));
      //   setBusinessNews(business.slice(0, 5));
      //   setFoodNews(food.slice(0, 5));
      setEditorsPick(Array.isArray(fashion) ? fashion.slice(0, 5) : []);
      setSportsNews(Array.isArray(sports) ? sports.slice(0, 5) : []);
      setBusinessNews(Array.isArray(business) ? business.slice(0, 5) : []);
      setFoodNews(Array.isArray(food) ? food.slice(0, 5) : []);
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
        const categoryName =
          article.pillarName?.toLowerCase() ||
          article.section_name?.toLowerCase() ||
          "general";
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

  useEffect(() => {
    fetchDefaultNews();
  }, []);
  //   useEffect(() => {
  //     console.log("Editors Pick: useEffect", editorsPick);
  //     console.log("Sports News: useEffect", sportsNews);
  //     console.log("Business News: useEffect", businessNews);
  //     console.log("Food News: useEffect", foodNews);
  //   }, [editorsPick, sportsNews, businessNews, foodNews]); // ✅ Log only when these states update

  useEffect(() => {
    applyFilters();
  }, [selectedSources, selectedCategories, selectedAuthors, news]);

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
        filteredNews,
        applyFilters,
        loading,
        resetFilters,
        editorsPick,
        sportsNews,
        businessNews,
        foodNews,
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
