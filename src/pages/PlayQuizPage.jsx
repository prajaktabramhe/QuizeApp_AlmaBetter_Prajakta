import  { useEffect, useState } from "react";
import { Button, Card, CardContent, Typography, Radio, RadioGroup, FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PlayQuizPage = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [quizAnswers, setQuizAnswers] = useState({});

  useEffect(() => {
    const loadedQuestions = JSON.parse(localStorage.getItem("questions")) || [];
    setQuestions(loadedQuestions);
  }, []);

  // ⭐ Calculate score function
  const calculateScore = (answers) => {
    let score = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctOption) {
        score++;
      }
    });
    return score;
  };

  const handleNext = () => {
    const updatedAnswers = {
      ...quizAnswers,
      [currentIndex]: selectedAnswer || "Not answered",
    };

    setQuizAnswers(updatedAnswers);
    localStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers));

    setSelectedAnswer("");
    setCurrentIndex((prev) => prev + 1);
  };

  const handleSubmitQuiz = () => {
    const updatedAnswers = {
      ...quizAnswers,
      [currentIndex]: selectedAnswer || "Not answered",
    };

    localStorage.setItem("quizAnswers", JSON.stringify(updatedAnswers));

    // calculate score
    const score = calculateScore(updatedAnswers);
    const total = questions.length;

    // send score + total to result page
    navigate("/result", { state: { score, total } });
  };

  if (questions.length === 0) {
    return <Typography>No quiz available</Typography>;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div style={{ display: "flex", justifyContent: "center", paddingTop: 40 }}>
      <Card sx={{ width: 450, padding: 3, borderRadius: 3, boxShadow: 4 }}>
        <CardContent>

          {/* Question Count */}
          <Typography sx={{ fontSize: 16, fontWeight: 600, mb: 2, color: "#555" }}>
            Question {currentIndex + 1} / {questions.length}
          </Typography>

          {/* Question */}
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
            {currentQuestion.question}
          </Typography>

          {/* Options */}
          <RadioGroup value={selectedAnswer} onChange={(e) => setSelectedAnswer(e.target.value)}>
            {currentQuestion.options?.map((opt, i) => (
              <FormControlLabel key={i} value={opt} control={<Radio />} label={opt} />
            ))}
          </RadioGroup>

          {/* Footer */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
            {currentIndex < questions.length - 1 ? (
              <Button variant="contained" sx={{ width: 150, borderRadius: 2 }} onClick={handleNext}>
                Next Question
              </Button>
            ) : (
              <Button
                variant="contained"
                sx={{ width: 150, borderRadius: 2, backgroundColor: "#2e7d32" }}
                onClick={handleSubmitQuiz}
              >
                Submit
              </Button>
            )}
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default PlayQuizPage;
