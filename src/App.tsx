import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
function App() {
  return (
    <div className=" p-4 t">
      <NavBar />
      <div className="bg-[#ddd] shadow-md rounded-lg p-4">
        <SearchBar />
        <Filters />
      </div>
      <Home />
    </div>
  );
}

export default App;
