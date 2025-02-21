
import { IoIosSettings } from "react-icons/io";
import { useNews } from "../context/NewsContext";
// import PersonalizationModal from "./PersonalizationModal";

const NavBar = () => {

 const {
   
   setSelectedSources,
 
   setSelectedCategories,
  
   setSelectedAuthors,
   setQuery,
   fetchDefaultNews,
 } = useNews();
  return (
    <>
      <div className="flex justify-between items-center  ">
        <h1
          className="text-3xl font-bold text-center cursor-pointer "
          onClick={() => {
            setSelectedSources([]);
            setSelectedCategories([]);
            setSelectedAuthors([]);
            fetchDefaultNews();
            setQuery("")
          }}
        >
          📰 Newscripta
        </h1>
        <div className="text-3xl ">
          {" "}
          <IoIosSettings />
        </div>
      </div>

      {/* <button onClick={() => setIsModalOpen(true)}>⚙️ Personalize Feed</button>
      <PersonalizationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      /> */}
    </>
  );
};

export default NavBar;
