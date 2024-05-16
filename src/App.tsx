import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/default";
import HomePageContent from "./components/pages/HomePageContent";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

function App() {
  const darkState = useSelector((state: RootState) => state.darkState.value);
  return (
    <div className={darkState ? "tw-dark" : ""}>
      <Routes>
        <Route path="/:id" element={<Layout />}>
          <Route index element={<HomePageContent />}></Route>
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePageContent />}></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
