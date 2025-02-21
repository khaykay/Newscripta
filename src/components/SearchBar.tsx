
import { useNews } from "../context/NewsContext";

const SearchBar = () => {
  const { fetchNews, loading, query, setQuery } = useNews();
  

  const handleSearch = () => {
    if (query.trim()) fetchNews(query);
  };

 return (
  
     <div
       className={`relative  flex items-center bg-white shadow-lg rounded-3xl px-2 transition-all w-full sm:w-2/5 h-[50px] justify-center `}
     >
       <input
         type="text"
         placeholder="Search news..."
         value={query}
         onChange={(e) => setQuery(e.target.value)}
         className="w-full  bg-transparent border-none outline-none text-sm text-black font-medium transition-opacity duration-500 "
       />
       <button
         onClick={handleSearch}
         disabled={loading}
         className={`absolute right-4 w-10 h-10 flex items-center justify-center rounded-full 
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } 
            text-white transition-transform`}
       >
         🔍
       </button>
       
     </div>
  
 );
};

export default SearchBar;


