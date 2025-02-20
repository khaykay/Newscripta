import EditorsPick from "../components/EditorsPick";
import CategorySection from "../components/CategorySection";
import { useNews } from "../context/NewsContext";
import NewsList from "../components/NewsList";

const Home = () => {
  const {
    sportsNews,
    businessNews,
    foodNews,
    editorsPick,
    filteredNews,
    loading,
  } = useNews();

  return (
    <div>
      <NewsList filteredNews={filteredNews} loading={loading} />
      {editorsPick?.length > 0 && <EditorsPick />}

      <CategorySection title="Sports" articles={sportsNews} />
      <CategorySection title="Business" articles={businessNews} />
      <CategorySection title="Food" articles={foodNews} />
      {/* {sportsNews?.length > 0 && (
        <CategorySection title="Sports" articles={sportsNews} />
      )}
      {businessNews?.length > 0 && (
        <CategorySection title="Business" articles={businessNews} />
      )}
      {foodNews?.length > 0 && (
        <CategorySection title="Food" articles={foodNews} />
      )} */}
    </div>
  );
};

export default Home;
