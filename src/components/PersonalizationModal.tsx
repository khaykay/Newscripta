// import { useState } from "react";
// import { useNews } from "../context/NewsContext";

// interface PersonalizationModalProps {
//   isOpen: boolean;
//   onClose: () => void;
// }

// const PersonalizationModal: React.FC<PersonalizationModalProps> = ({
//   isOpen,
//   onClose,
// }) => {
//   const {
//     preferredCategories,
//     setPreferredCategories,
//     preferredSources,
//     setPreferredSources,
//     preferredAuthors,
//     setPreferredAuthors,
//     fetchDefaultNews,
//   } = useNews();

//   const categories = ["Top Headlines", "Fashion", "Sports", "Business", "Food"];
//   const sources = ["BBC", "CNN", "The Guardian", "New York Times"]; // Sample sources
//   const authors = ["John Doe", "Jane Smith", "Michael Brown"]; // Sample authors

//   const [tempCategories, setTempCategories] = useState(preferredCategories);
//   const [tempSources, setTempSources] = useState(preferredSources);
//   const [tempAuthors, setTempAuthors] = useState(preferredAuthors);

//   const handleSave = () => {
//     setPreferredCategories(tempCategories);
//     setPreferredSources(tempSources);
//     setPreferredAuthors(tempAuthors);
//     fetchDefaultNews(); // Fetch personalized news
//     onClose();
//   };

//   return isOpen ? (
//     <div className="modal">
//       <div className="modal-content">
//         <h2>Personalize Your News Feed</h2>

//         <h3>Categories</h3>
//         {categories.map((category) => (
//           <label key={category}>
//             <input
//               type="checkbox"
//               checked={tempCategories.includes(category)}
//               onChange={() =>
//                 setTempCategories((prev) =>
//                   prev.includes(category)
//                     ? prev.filter((c) => c !== category)
//                     : [...prev, category]
//                 )
//               }
//             />
//             {category}
//           </label>
//         ))}

//         <h3>Sources</h3>
//         {sources.map((source) => (
//           <label key={source}>
//             <input
//               type="checkbox"
//               checked={tempSources.includes(source)}
//               onChange={() =>
//                 setTempSources((prev) =>
//                   prev.includes(source)
//                     ? prev.filter((s) => s !== source)
//                     : [...prev, source]
//                 )
//               }
//             />
//             {source}
//           </label>
//         ))}

//         <h3>Authors</h3>
//         {authors.map((author) => (
//           <label key={author}>
//             <input
//               type="checkbox"
//               checked={tempAuthors.includes(author)}
//               onChange={() =>
//                 setTempAuthors((prev) =>
//                   prev.includes(author)
//                     ? prev.filter((a) => a !== author)
//                     : [...prev, author]
//                 )
//               }
//             />
//             {author}
//           </label>
//         ))}

//         <button onClick={handleSave}>Save Preferences</button>
//         <button onClick={onClose}>Cancel</button>
//       </div>
//     </div>
//   ) : null;
// };

// export default PersonalizationModal;
