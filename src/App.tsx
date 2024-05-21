import { Routes, Route } from "react-router-dom";
import BlogContent from "./components/pages/blog/BlogContent";
import { useSelector } from "react-redux";
import { RootState } from "app/store";
import MovieContent from "./components/pages/movie/MovieContent";
import HomePageContent from "./components/pages/HomePageContent";
import BlogLayout from "./layouts/BlogLayout";
import MovieLayout from "./layouts/MovieLayout";
import Layout from "./layouts/default";
import NotFound from "./components/pages/NotFound";
import BlogHomePage from "./components/pages/blog/BlogHomePage";

function App() {
  const darkState = useSelector((state: RootState) => state.darkState.value);
  return (
    <div className={darkState ? "tw-dark" : ""}>
      <Routes>
        <Route path="/blog" element={<BlogLayout />}>
          <Route index element={<BlogHomePage />}></Route>
          <Route path="/blog/:id" element={<BlogContent />}></Route>
        </Route>
        <Route path="/movie/:id" element={<MovieLayout />}>
          <Route index element={<MovieContent />}></Route>
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePageContent />}></Route>
        </Route>
        <Route path="*">
          <Route index element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
