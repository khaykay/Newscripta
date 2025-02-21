import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import { RiColorFilterFill } from "react-icons/ri";
import { useState } from "react";
import ScrollToTop from "./components/ScrollToTop";
import { useNews } from "./context/NewsContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
function App() {
   const [isOpen, setIsOpen] = useState(false)
   const {  query} = useNews()
  return (
    <>
      <div className=" py-4 px-8 md:px-14">
        <NavBar />
        <div
          className={`  rounded-lg py-4 px-2 flex  justify-center gap-3 md:gap-5 items-center 
        `}
        >
          <SearchBar />
          {query.trim() && (
            <RiColorFilterFill
              size={28}
              className=""
              onClick={() => setIsOpen(!isOpen)}
            />
          )}
        </div>
        {isOpen && <Filters />}
        <Header/>
        <Home />
        <ScrollToTop />
      </div>
        <Footer />
    </>
  );
}

export default App;
