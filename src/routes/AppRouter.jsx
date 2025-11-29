import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import CreateQuizPage from "../pages/CreateQuizPage";
import MyQuizPage from "../pages/MyQuizPage";
import PlayQuizPage from "../pages/PlayQuizPage";
import QuizPage from "../pages/QuizPage";
import ResultPage from "../pages/ResultPage";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-quiz" element={<CreateQuizPage />} />
        <Route path="/my-quiz" element={<MyQuizPage />} />
        <Route path="/play-quiz" element={<PlayQuizPage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
      <Footer/>
    </BrowserRouter>
  );
};

export default AppRouter;
