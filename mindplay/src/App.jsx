import { Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header.jsx";
import BottomNav from "./components/layout/BottomNav.jsx";
import Footer from "./components/layout/Footer.jsx";
import Home from "./pages/Home.jsx";
import TestsList from "./pages/TestsList.jsx";
import TestDetail from "./pages/TestDetail.jsx";
import GamesList from "./pages/GamesList.jsx";
import GameDetail from "./pages/GameDetail.jsx";
import Couple from "./pages/Couple.jsx";
import ResultPage from "./pages/ResultPage.jsx";
import NotFound from "./pages/NotFound.jsx";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tests" element={<TestsList />} />
        <Route path="/tests/:slug" element={<TestDetail />} />
        <Route path="/juegos" element={<GamesList />} />
        <Route path="/juegos/:slug" element={<GameDetail />} />
        <Route path="/pareja" element={<Couple />} />
        <Route path="/resultado/:testSlug/:resultKey" element={<ResultPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <BottomNav />
    </>
  );
}
