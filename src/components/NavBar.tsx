
// import { IoIosSettings } from "react-icons/io";
// import { useNews } from "../context/NewsContext";
// // import PersonalizationModal from "./PersonalizationModal";

// const NavBar = () => {

//  const {
   
//    setSelectedSources,
 
//    setSelectedCategories,
  
//    setSelectedAuthors,
//    setQuery,
//    fetchDefaultNews,
//  } = useNews();
//   return (
//     <>
//       <div className="flex justify-between items-center  ">
//         <h1
//           className="text-3xl font-bold text-center cursor-pointer "
//           onClick={() => {
//             setSelectedSources([]);
//             setSelectedCategories([]);
//             setSelectedAuthors([]);
//             fetchDefaultNews();
//             setQuery("")
//           }}
//         >
//           📰 Newscripta
//         </h1>
//         <div className="text-3xl ">
//           {" "}
//           <IoIosSettings />
//         </div>
//       </div>

//       {/* <button onClick={() => setIsModalOpen(true)}>⚙️ Personalize Feed</button>
//       <PersonalizationModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//       /> */}
//     </>
//   );
// };

// export default NavBar;

import { IoIosSettings } from "react-icons/io";
import { useState } from "react";
import { useNews } from "../context/NewsContext";
import PersonalizationModal from "./PersonalizationModal";

const NavBar = () => {
  const {
    setSelectedSources,
    setSelectedCategories,
    setSelectedAuthors,
    setQuery,
    fetchDefaultNews,
  } = useNews();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1
          className="text-3xl font-bold text-center cursor-pointer"
          onClick={() => {
            setSelectedSources([]);
            setSelectedCategories([]);
            setSelectedAuthors([]);
            fetchDefaultNews();
            setQuery("");
          }}
        >
          📰 Newscripta
        </h1>
        <div
          className="md:flex cursor-pointer md:bg-gray-100 items-center md:p-2 md:rounded-3xl"
          onClick={() => setIsModalOpen(!isModalOpen)}
        >
          <IoIosSettings size={30}/>
          <span className="hidden md:inline-flex text-sm">personalize</span>
        </div>
      </div>

      {isModalOpen && (
        <PersonalizationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default NavBar;
