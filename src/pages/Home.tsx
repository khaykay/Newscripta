import EditorsPick from "../components/EditorsPick";
import CategorySection from "../components/CategorySection";
import { useNews } from "../context/NewsContext";
import NewsList from "../components/NewsList";

const Home = () => {
  const {
    sportsNews,
    businessNews,
    foodNews,
    filteredNews,
    loading,
    editorsPick
  } = useNews();

  return (
    <div>
      <NewsList filteredNews={filteredNews} loading={loading} />
      {editorsPick?.length > 0 &&<EditorsPick />}
      {sportsNews?.length > 0 && (
        <CategorySection title="Sports" articles={sportsNews} />
      )}
      {businessNews?.length > 0 && (
        <CategorySection title="Business" articles={businessNews} />
      )}
      {foodNews?.length > 0 && (
        <CategorySection title="Food" articles={foodNews} />
      )}
    </div>
  );
};

export default Home;
