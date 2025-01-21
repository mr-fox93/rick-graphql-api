// App.js
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage";
import CharacterDetails from "./components/CharacterDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/character/:id" element={<CharacterDetails />} />
    </Routes>
  );
}

export default App;
